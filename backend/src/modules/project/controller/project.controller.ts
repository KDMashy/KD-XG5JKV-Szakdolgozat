import { CreateProjectDto, UpdateProjectDto } from './../dto/project.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { Request } from 'express';
import { CreateRowDto } from '../dto/row.dto';

@Controller('project')
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

    @Post('create-row')
    addRowForProject(@Body() row: CreateRowDto) {
        return this.projectService.createRow(row)
    }

    @Put(':id')
    update(@Body() project: UpdateProjectDto, @Param('id', ParseIntPipe) id:number) {
        return this.projectService.updateProject(project, id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.deleteProject(id)
    }
}
