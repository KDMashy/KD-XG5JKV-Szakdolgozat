import { CreateTeamDto, UpdateTeamDto } from './../dto/team.dto';
import { Controller, Get, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Delete, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { TeamService } from '../service/team.service';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';

@Controller('team')
@UseGuards(AuthenticatedGuard)
export class TeamController {
    constructor (
        private readonly teamService: TeamService
    ) {}

    @Get('')
    index() {
        return this.teamService.index()
    }

    @Get(':id')
    getAll(@Param('id', ParseIntPipe) id: number) {
        return this.teamService.getAllForUser(id)
    }

    @Get('/user/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.teamService.getOneById(id)
    }

    @Post('')
    create(@Body() team: CreateTeamDto) {
        return this.teamService.createTeam(team)
    }

    @Put(':id')
    update(@Body() team: UpdateTeamDto, @Param('id', ParseIntPipe) id: number) {
        return this.teamService.updateTeam(team, id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.teamService.deleteTeam(id)
    }
}
