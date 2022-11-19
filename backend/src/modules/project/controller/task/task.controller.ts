import { CreateTaskDto, UpdateTaskDto } from './../../dto/task.dto';
import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { TaskService } from '../../service/task/task.service';
import { Delete, Get, Param, Put } from '@nestjs/common/decorators';

@Controller('task')
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
