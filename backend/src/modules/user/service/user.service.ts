import { Statuses } from './../../constants/Statuses.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/modules/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userModel: Repository<User>,
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

    async deleteUser(id: number){
        try{
            await this.userModel
                .createQueryBuilder()
                .delete()
                .from(User)
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
}
