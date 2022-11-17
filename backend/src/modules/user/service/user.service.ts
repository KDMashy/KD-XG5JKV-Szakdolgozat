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
        if (
            user.username.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0
        ){
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

            //Email Regex Check
            var emailRegex =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(!emailRegex.test(user.email)){
                throw new HttpException({
                    message: 'User email is not correct',
                    status: HttpStatus.BAD_REQUEST,
                }, HttpStatus.BAD_REQUEST);
            }

            //Password Regex check
            var passwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if(!passwRegex.test(user.password)){
                throw new HttpException({
                    message: `User password is not correct, should contain: uppercase letter,  lowercase letter, special case letter, digits, and minimum length of 8`,
                    status: HttpStatus.BAD_REQUEST,
                }, HttpStatus.BAD_REQUEST);
            }

            //Username validation
            if(user.username.length < 5){
                throw new HttpException({
                    message: 'Username is not correct',
                    status: HttpStatus.BAD_REQUEST,
                }, HttpStatus.BAD_REQUEST);
            }

            //Create and Save user
            const passw = encodePassword(user.password);
            const newUser = await this.userModel.create({
                username: user.username,
                email: user.email,
                password: passw,
            });
            newUser.save();
            return HttpStatus.CREATED;
        } else {
            throw new HttpException({
                message: 'Missing fields from user registration',
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
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
            email: user.email
        };
        return serialized;
    }
}
