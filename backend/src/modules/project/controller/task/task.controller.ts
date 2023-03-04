import { CreateTaskDto, UpdateTaskDto } from './../../dto/task.dto';
import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { TaskService } from '../../service/task/task.service';
import { Delete, Get, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';

@Controller('task')
@UseGuards(AuthenticatedGuard)
export class TaskController {
    constructor (
        private readonly taskService: TaskService
    ) {}

    @Get('')
    index() {
        return this.taskService.getTasks()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getTaskById(id)
    }

    @Post('')
    create(@Body() task: CreateTaskDto) {
        return this.taskService.createTask(task)
    }

    @Put(':id')
    update(@Body() task: UpdateTaskDto, @Param('id', ParseIntPipe) id: number) {
        return this.taskService.updateTask(task, id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTask(id)
    }
}
