import { Tasks } from './../../entity/tasks.entity';
import { ProjectTasks } from './../../entity/project_tasks.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor (
        @InjectRepository(ProjectTasks)
        private projectTasksModel: Repository<ProjectTasks>,
        @InjectRepository(Tasks)
        private tasksModel: Repository<Tasks>,
    ) {}
}
