import { CreateProjectDto, UpdateProjectDto } from './../dto/project.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { Request } from 'express';
import { CreateRowDto, UpdateRowDto } from '../dto/row.dto';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('project')
@UseGuards(AuthenticatedGuard)
export class ProjectController {
    constructor (
        private readonly projectService: ProjectService
    ) {}

    @Get('')
    getAll() {
        return this.projectService.getAll()
    }

    @Get(':id')
    getOneById(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.getProjectById(id)
    }

    @Get('/user/:id')
    index(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.getAllUserInfoById(id)
    }

    @Post('')
    create(@Body() project: CreateProjectDto) {
        return this.projectService.createProject(project)
    }

    @Post('add-team')
    addTeamForProject(@Req() req: Request) {
        return this.projectService.addProjectTeam(req.query)
    }

    @Post('row')
    addRowForProject(@Body() row: CreateRowDto) {
        return this.projectService.createRow(row)
    }

    @Put(':id')
    update(@Body() project: UpdateProjectDto, @Param('id', ParseIntPipe) id:number) {
        return this.projectService.updateProject(project, id)
    }

    @Put('row/:id')
    updateRowForProject(@Body() row: UpdateRowDto, @Param('id', ParseIntPipe) id: number) {
        return this.projectService.updateRow(row, id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.deleteProject(id)
    }

    @Delete('row/:id')
    deleteRow(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.deleteRow(id)
    }
}
