import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/modules/user/entity/user.entity";
import { UserService } from "src/modules/user/service/user.service";

export class SessionSerializer extends PassportSerializer{
    constructor(@Inject(UserService)private readonly userService: UserService){
        super();
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        done(null, user);
    }

    async deserializeUser(user: User, done: (err, user: User) => void) {
        const userDB = await this.userService.findUserById(user.id);
        return userDB ? done(null, userDB) : done(null, null);
    }
}