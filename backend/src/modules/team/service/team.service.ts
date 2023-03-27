import { Statuses } from './../../constants/Statuses.enum';
import { CreateTeamDto, UpdateTeamDto } from './../dto/team.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { Teams } from './../entity/teams.entity';
import { Team } from './../entity/team.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatService } from 'src/modules/chat/service/chat.service';

@Injectable()
export class TeamService {
    constructor (
        @InjectRepository(Team)
        private teamModel: Repository<Team>,
        @InjectRepository(Teams)
        private teamsModel: Repository<Teams>,
        @InjectRepository(User)
        private userModel: Repository<User>,
        private chatService: ChatService
    ) {}

    async index() {
        return await this.teamModel
            .find({
                relations: [
                    "team_creator",
                    "projects",
                    "projects.project",
                    "membership",
                    "membership.user"
                ]
            })
    }

    async getAllForUser(id, req) {
        return await this.teamModel.find({
            where: { team_creator: id },
            relations: [
                "team_creator",
                "projects",
                "projects.project",
                "membership",
                "membership.user"
            ],
            skip: req.offset,
            take: req.limit
        })
    }

    async getOneById(id: number) {
        return await this.teamModel.findOne({
            where: { id: id },
            relations: [
                "team_creator",
                "projects",
                "projects.project",
                "membership",
                "membership.user"
            ]
        })
    }

    async createTeam(team: CreateTeamDto, req) {
        const newTeam = await this.teamModel.create({
            team_name: team.team_name,
            team_description: team.team_description,
            team_creator: team.team_creator,
            team_only_creator: team.team_only_creator,
            team_status: Statuses.OPEN
        })
        let response: Team = await newTeam.save()

        if(response) {
            try {
                await this.teamsModel.create({
                    user: team.team_creator,
                    team: response.id
                }).save()
    
                req.query?.members?.map(async member => {
                    await this.AddNewMemberFunc(response, req.user, member)
                })
            } catch (err) {
                console.log(err);
                
                return HttpStatus.CONFLICT
            }
        }

        return await this.teamModel.findOne({
            where: { id: response.id },
            relations: [
                'team_creator',
            ]
        })
    }

    async AddNewMemberReq (req) {
        if(!req.query.team_id || !req.query.members) return HttpStatus.BAD_REQUEST

        let team = await this.teamModel.findOne({
            where: {id: req.query.team_id}
        })

        req.query.members?.map(async member => {
            await this.AddNewMemberFunc(team, req.user, member)
        })
    }

    async RemoveMemberReq (req) {
        if(!req.query.member || ! req.query.team) return HttpStatus.BAD_REQUEST

        let foundMember = await this.userModel.findOne({
            where: {id: req.query.member},
            relations: [
                'team_member',
                'sender'
            ]
        })

        if(!foundMember) return HttpStatus.CONFLICT

        // await this.teamsModel
        //     .createQueryBuilder()
        //     .delete()
        //     .from(Teams)
        //     .where('user = :id', {id: req.query.member})
        //     .andWhere('team = :id', {id: req.query.team})
        //     .execute()
        await this.teamsModel.remove(foundMember.team_member)
    
        await this.chatService.DeleteChannelForTeamMember(foundMember)
    }

    async AddNewMemberFunc (team, user, member) {
        await this.teamsModel.create({
            user: member,
            team: team.id
        }).save()
        await this.chatService.CreateChannel({
            message_channel: `${team.team_name}.${team.team_name}group`,
            first_user: member,
            second_user: user?.id
        })
    }

    async updateTeam(team: UpdateTeamDto, id: number) {
        let editTeam = await this.teamModel.findOne({
            where: { id: id }
        })
        editTeam.team_name = team.team_name
        editTeam.team_description = team.team_description
        editTeam.team_creator = team.team_creator
        editTeam.team_only_creator = team.team_only_creator
        editTeam.team_status = team.team_status
        let response = await editTeam.save()
        return response
    }

    async deleteTeam(id: number) {
        return await this.teamModel
            .createQueryBuilder()
            .delete()
            .from(Team)
            .where('id = :id', { id: id })
            .execute()
    }
}
