import { CreateTaskDto, UpdateTaskDto } from './../../dto/task.dto';
import { Tasks } from './../../entity/tasks.entity';
import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Row } from '../../entity/row.entity';

@Injectable()
export class TaskService {
    constructor (
        @InjectRepository(Tasks)
        private tasksModel: Repository<Tasks>,
        @InjectRepository(Row)
        private rowModel: Repository<Row>,
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
        let searchRow = await this.rowModel.findOne({where: {id: task.row}})

        if(!searchRow) 
            throw new HttpException({
                message: 'The given row id is not valid',
                status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST)

        const newTask = this.tasksModel.create({
            task_name: task.task_name,
            task_creator: task.task_creator,
            task_only_creator: task.task_only_creator,
            project: task.project_id,
            row: task.row,
            count: task.count
        })
        let response: Tasks = await newTask.save()

        return await this.tasksModel.find({
            where: {id: response.id},
            relations: [
                'task_creator',
                'project',
                'badge',
                'row'
            ]
        })
    }

    async updateTask(task: UpdateTaskDto, id: number) {
        const editTask: Tasks = await this.tasksModel.findOne({ where: { id: id }})
        if(!editTask) 
            throw new HttpException({
                message: 'The given id is not valid',
                status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST);
            
        editTask.task_name = task.task_name
        editTask.task_creator = task.task_creator
        editTask.task_only_creator = task.task_only_creator
        editTask.row = task.row
        editTask.count = task.count
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
