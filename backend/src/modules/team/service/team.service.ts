import { Statuses } from './../../constants/Statuses.enum';
import { CreateTeamDto, UpdateTeamDto } from './../dto/team.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { Teams } from './../entity/teams.entity';
import { Team } from './../entity/team.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor (
        @InjectRepository(Team)
        private teamModel: Repository<Team>,
        @InjectRepository(Teams)
        private teamsModel: Repository<Teams>,
        @InjectRepository(User)
        private userModel: Repository<User>
    ) {}

    async index() {
        return await this.teamsModel
            .find({
                relations: [
                    "user",
                    "project",
                    "team"
                ]
            })
    }

    async getAllForUser(id: number) {
        return await this.teamsModel.find({
            where: { user: id },
            relations: [
                'user',
                'team',
                'project'
            ]
        })
    }

    async getOneById(id: number) {
        return await this.teamsModel.findOne({
            where: { user: id },
            relations: [
                'user',
                'team',
                'project'
            ]
        })
    }

    async createTeam(team: CreateTeamDto) {
        const newTeam = await this.teamModel.create({
            team_name: team.team_name,
            team_description: team.team_description,
            team_creator: team.team_creator,
            team_only_creator: team.team_only_creator,
            team_status: Statuses.OPEN
        })
        let response: Team = await newTeam.save()
        if(response) {
            await this.teamsModel.create({
                user: team.team_creator,
                project: team.project,
                team: response.id
            }).save()
        }
        return await this.teamsModel.findOne({
            where: { id: response.id },
            relations: [
                'user',
                'project',
                'team'
            ]
        })
    }

    async updateTeam(team: UpdateTeamDto, id: number) {
        const editTeam: Team = await this.teamModel.findOne({
            where: { id: id }
        })
        const teamConnect: Teams = await this.teamsModel.findOne({
            where: { team: id }
        })
        editTeam.team_name = team.team_name
        editTeam.team_description = team.team_description
        editTeam.team_creator = team.team_creator
        editTeam.team_only_creator = team.team_only_creator
        editTeam.team_status = team.team_status
        teamConnect.project = team.project
        await editTeam.save()
        await teamConnect.save()
        return await this.teamsModel.findOne({
            where: { team: id },
            relations: [
                'user',
                'team',
                'project'
            ]
        })
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
