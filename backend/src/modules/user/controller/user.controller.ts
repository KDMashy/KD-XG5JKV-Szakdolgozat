import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateUserDto, IUser } from '../dto/user.dto';
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

    @UseGuards(AuthenticatedGuard)
    @Get('search-by-username')
    searchByName(@Req() req) {
        return this.userService.searchUser(req.query?.string ?? "", req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('add-new-friend')
    addNewFriend(@Req() req) {
        return this.userService.addNewFriend(req.query?.id, req.user)
    }

    // @UseGuards(AuthenticatedGuard)
    // @Get('search-by-username')
    // removeFriend(@Req() req) {
    //     return this.userService.searchUser(req.query?.string ?? "", req.user)
    // }

    @Post('register')
    @HttpCode(201)
    createUser(@Body() user: CreateUserDto){
        return this.userService.createUser(user);
    }
    
    @UseGuards(AuthenticatedGuard)
    @Put('edit')
    @HttpCode(201)
    editUser(@Body() user: IUser){
        return this.userService.EditProfile(user);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('delete')
    @HttpCode(202)
    deleteUserById(@Req() req,) {
        return this.userService.deleteUser(req.user.id);
    }
}
