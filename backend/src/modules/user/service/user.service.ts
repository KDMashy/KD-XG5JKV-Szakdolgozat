import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../../auth/service/auth/auth.service';
import { Statuses } from './../../constants/Statuses.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/modules/utils/bcrypt';
import { Like, Repository } from 'typeorm';
import { CreateUserDto, IUser } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { Inject } from '@nestjs/common/decorators';
import { Friend } from '../entity/friends.entity';
import { ChatService } from 'src/modules/chat/service/chat.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userModel: Repository<User>,
        @InjectRepository(Friend)
        private friendModel: Repository<Friend>,
        private chatService: ChatService,
        private readonly JwtService: JwtService
    ) {}

    async createUser(user: CreateUserDto) {
        //Keresés, létezik-e már
        const findUser = await this.userModel.findOne({ 
            where: {
                username: user.username
            }
        });
        if (findUser){
            throw new HttpException({
                message: 'User already exists',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }

        //Username validation
        if(user.username.length < 5){
            throw new HttpException({
                message: 'Username is not correct',
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }

        if(user.password !== user.confirmation){
            throw new HttpException({
                message: 'Passwords does not match',
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }

        //Create and Save user
        const passw = encodePassword(user.password);
        const newUser = await this.userModel.create({
            username: user.username,
            email: user.email,
            password: passw,
            first_name: user.first_name,
            last_name: user.last_name,
            status: Statuses.PENDING
        });
        newUser.save();
        return HttpStatus.CREATED;
    }

    async getUserModel(id: number) {
        return await this.userModel
            .createQueryBuilder('users')
            .select('users.group')
            .where("id = :id", {id: id})
            .getOne();
    }

    async deleteUser(id: number){
        try{
            await this.userModel
                .createQueryBuilder()
                .update(User)
                .set({
                    status: Statuses.CLOSED
                })
                .where("id = :id", { id: id })
                .execute();
            return HttpStatus.OK;
        } catch(err){
            return HttpStatus.CONFLICT;
        }
    }

    async getUsers() {
        return await this.userModel.find();
    }

    async findUserByEmail(email: string): Promise<User>{
        return await this.userModel.findOne({ 
            where: {
                email: email
            }
         });
    }

    async findUserById(id: number) {
        return await this.userModel.findOne({
            where: {
                id: id
            }
        });
    }

    async decodeJwt(jwt) {
        return await this.JwtService.decode(jwt)
    }

    async getUser(req) {
        return await this.userModel
            .findOne({
                where: {id: req.user.id},
                relations: [
                    'created_projects',
                    'created_projects.tasks',
                    'created_projects.badges',
                    'created_projects.badges.task',
                    'created_projects.badges.task.task',
                    'created_projects.teams',
                    'created_projects.teams.team',
                    'created_teams',
                    'created_teams.membership',
                    'created_teams.projects',
                    'created_teams.projects.project',
                    'created_tasks',
                    'created_tasks.project',
                    'created_tasks.joined_user',
                    'created_tasks.joined_user.user',
                    'created_badges',
                    'created_badges.project',
                    'created_badges.task',
                    'created_badges.task.task',
                    'team_member',
                    'team_member.team',
                    'tasks',
                ]
            })
    }

    async EditProfile (user: IUser) {
        try {
            return await this.userModel.update(
                user?.id,
                user
            )
        } catch(err) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    getProfile(user: User){
        var serialized = {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            status: user.status
        };
        return serialized;
    }

    async searchUser (search, user) {
        let users = await this.userModel.find({
            where: {
                username: Like(`%${search ? search.toString().toLowerCase() : ""}%`)
            },
            relations: [
                'friend_one',
                'friend_two',
                'friend_one.first_user',
                'friend_two.first_user',
                'friend_one.second_user',
                'friend_two.second_user',
            ]
        })

        if(!users) return HttpStatus.CONFLICT;
        let returnUsers = []

        users?.map((item) => {
            let check = false
            let firsts = JSON.parse(JSON.stringify(item?.friend_one))
            let seconds = JSON.parse(JSON.stringify(item?.friend_two))
            if(
                firsts?.filter(fu => fu?.first_user?.id === item?.id)[0] ||
                seconds?.filter(su => su?.second_user?.id === item?.id)[0]
            ) check = true
            if(!check) returnUsers.push(item)
        })

        return returnUsers
    }

    async addNewFriend (newFriend, user) {
        if(!newFriend) return HttpStatus.BAD_REQUEST

        let newFriendRecord = await this.friendModel.create({
            first_user: user?.id,
            second_user: newFriend
        })

        let first_user = await this.findUserById(user?.id)
        let second_user = await this.findUserById(newFriend)

        if(!first_user || !second_user) return HttpStatus.CONFLICT

        newFriendRecord.save()
        this.chatService.CreateChannel({
            message_channel: `${first_user?.username}x${second_user?.username}.${second_user?.username}`,
            first_user: first_user?.id,
            second_user: second_user?.id,
        })
    }
}
