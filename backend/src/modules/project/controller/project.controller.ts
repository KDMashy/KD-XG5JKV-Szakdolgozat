import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {
    constructor (
        private readonly projectService: ProjectService
    ) {}

    @Get('/projects/:id')
    index(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.index(id)
    }
}
