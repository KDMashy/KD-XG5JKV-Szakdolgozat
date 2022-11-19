import { Projects } from './../entity/projects.entity';
import { Project } from './../entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(User)
        private userModel: Repository<User>,
        @InjectRepository(Project)
        private projectModel: Repository<Project>,
        @InjectRepository(Projects)
        private projectsModel: Repository<Projects>,
    ) {}

    async index(id: number) {
        if(isNaN(id)) throw new HttpException({
            message: 'The given ID is not correct',
            status: HttpStatus.BAD_REQUEST,
        }, HttpStatus.BAD_REQUEST)

        return await this.userModel
            .find({
                where: {id: id},
                relations: [
                    'projects', 
                    'projects.project', 
                    'projects.project.tasks', 
                    'projects.project.tasks.task',
                    'projects.project.tasks.task.badge',
                    'projects.project.tasks.task.badge.badge',
                    'projects.project.badges',
                    'projects.project.badges.badge',
                    'projects.project.team',
                    'projects.project.team.team'
                ]
            })

            // .query(`
            // SELECT
            //     users.id AS user_id,
            //     users.email AS user_email,
            //     users.username AS username,
            //     users.first_name AS user_first_name,
            //     users.last_name AS user_last_name,
            //     users.status AS user_status,
            //     project.id AS project_id,
            //     project.project_name AS project_name,
            //     tasks.id AS task_id
            // FROM
            //     users
            // INNER JOIN projects ON users.id = projects.user_id
            // INNER JOIN project ON projects.project_id = project.id
            // INNER JOIN project_tasks ON project.id = project_tasks.project_id
            // INNER JOIN tasks ON project_tasks.task_id = tasks.id
            // WHERE
            //     users.id = ${id}`)
                
            // .createQueryBuilder()
            // .select('users.id')
            // .addSelect('users.email')
            // .addSelect('users.first_name')
            // .addSelect('users.last_name')
            // .addSelect('users.status')
            // .select('project.id', 'project_id')
            // .select('tasks.id', 'task_id')
            // .innerJoin('projects', 'projects.user_id = users.id')
            // .innerJoin('project', 'project.id = projects.project_id')
            // .innerJoin('project_tasks', 'project_tasks.project_id = project.id')
            // .innerJoin('tasks', 'tasks.id = project_tasks.task_id')
            // .where('users.id = :id', { id: id})
            // .getRawMany()
    }
}
