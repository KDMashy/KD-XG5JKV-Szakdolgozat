import { CreateTaskDto, UpdateTaskDto } from './../../dto/task.dto';
import { Tasks } from './../../entity/tasks.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor (
        @InjectRepository(Tasks)
        private tasksModel: Repository<Tasks>,
    ) {}

    async getTasks() {
        return await this.tasksModel.find({
            relations: [
                'task_creator',
                'project',
                'badge',
                'badge.badge',
                'joined_user',
                'joined_user.user',
            ]
        })
    }

    async getTaskById(id: number) {
        return await this.tasksModel.findOne({ where: { id: id }, relations: [
            'task_creator',
            'project',
            'badge',
            'badge.badge',
            'joined_user',
            'joined_user.user',
        ]})
    }

    async createTask(task: CreateTaskDto) {
        const newTask = this.tasksModel.create({
            task_name: task.task_name,
            task_creator: task.task_creator,
            task_only_creator: task.task_only_creator,
            project: task.project_id
        })
        let response: Tasks = await newTask.save()

        return await this.tasksModel.find({
            where: {id: response.id},
            relations: [
                'task_creator',
                'project',
                'badge'
            ]
        })
    }

    async updateTask(task: UpdateTaskDto, id: number) {
        const editTask: Tasks = await this.tasksModel.findOne({ where: { id: id }})
        editTask.task_name = task.task_name
        editTask.task_creator = task.task_creator
        editTask.task_only_creator = task.task_only_creator
        let response = await editTask.save()
        return response
    }

    async deleteTask(id: number) {
        return await this.tasksModel
            .createQueryBuilder()
            .delete()
            .from(Tasks)
            .where('id = :id', { id: id })
            .execute()
    }
}
