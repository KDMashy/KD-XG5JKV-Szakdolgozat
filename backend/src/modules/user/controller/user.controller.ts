import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthenticatedGuard)
    @Get('')
    @HttpCode(200)
    user(@Req() req) {
        return this.userService.getUser(req)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    @HttpCode(200)
    getUserProfile(@Req() req) {
        return this.userService.getProfile(req.user);
    }

    @Post('register')
    @HttpCode(201)
    createUser(@Body() user: CreateUserDto){
        return this.userService.createUser(user);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('delete')
    @HttpCode(202)
    deleteUserById(@Req() req,) {
        return this.userService.deleteUser(req.user.id);
    }
}
