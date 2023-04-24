import { Body, Controller, Get, HttpCode, Post, Request, Session, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { LoginAdminDto } from '../dto/admin.dto';
import { AdminService } from '../service/admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @UseGuards(AuthenticatedGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Body() admin: LoginAdminDto, @Request() req) {        
        return await this.adminService.login(req.user, admin)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('logout')
    @HttpCode(200)
    async logout(@Request() req, @Session() session) {     
        session.destroy();   
        return await this.adminService.logout(req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('check-info')
    @HttpCode(200)
    async test(@Request() req) {     
        return await this.adminService.checkIfHasLogin(req);
    }
}
