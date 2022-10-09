import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/service/user.service';
import { comparePassword } from 'src/modules/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,    
    ) {}

    async validateUser(username:string, password: string) {
        const userDB = await this.userService.findUserByName(username);
        if(userDB){
            const matched = comparePassword(password, userDB.password);
            if (matched){
                return userDB;
            }
            return null;
        }
        return null;
    }

    async login(user: User) {
        const load = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
        };
        return {
            access_token: this.jwtService.sign(load),
        };
    }
}
