import { Statuses } from './../../constants/Statuses.enum';
import { CreateProjectDto, UpdateProjectDto } from './../dto/project.dto';
import { Projects } from './../entity/projects.entity';
import { Project } from './../entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
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

    async getAll() {
        return await this.projectModel.find({
            relations: [
                'user_projects',
                'tasks',
                'badges',
                'team',
                'team.team',
                'user_projects.user',
                'badges.badge',
                'tasks.task',
                'tasks.task.badge',
                'tasks.task.badge.badge',
                'tasks.task.joined_user'
            ]
        })
    }
    
    async getProjectById(id: number) {
        return await this.projectModel.findOne({
            where: { id: id },
            relations: [
                'user_projects',
                'tasks',
                'badges',
                'team',
                'team.team',
                'user_projects.user',
                'badges.badge',
                'tasks.task',
                'tasks.task.badge',
                'tasks.task.badge.badge',
                'tasks.task.joined_user'
            ]
        })
    }

    async createProject (project: CreateProjectDto) {
        const newProject = await this.projectModel.create({
            project_name: project.project_name,
            project_description: project.project_description,
            project_creator: project.project_creator,
            project_only_creator: project.project_only_creator,
            project_img_url: "",
            project_status: Statuses.OPEN
        })
        let response: Project = await newProject.save()

        if(response) {
            await this.projectsModel.create({
                user: project.project_creator,
                project: response.id
            }).save() 
        }
        return await this.userModel.find({
            where: {id: project.project_creator},
            relations: [
                'projects',
                'projects.project'
            ]
        })
    }

    async updateProject(project: UpdateProjectDto, id:number) {
        const editProject: Project = await this.projectModel.findOne({ where: { id: id}})
        editProject.project_name = project.project_name
        editProject.project_description = project.project_description
        editProject.project_only_creator = project.project_only_creator
        if(project.project_creator) editProject.project_creator = project.project_creator
        if(project.status) editProject.project_status = project.status === "open" ? Statuses.OPEN : Statuses.CLOSED
        let response = await editProject.save()
        return response
    }

    async deleteProject(id: number) {
        return await this.projectModel
            .createQueryBuilder()
            .delete()
            .from(Project)
            .where('id = :id', { id: id })
            .execute()
    }

    async getAllUserInfoById(id: number) {
        if(isNaN(id)) throw new HttpException({
            message: 'The given ID is not correct',
            status: HttpStatus.BAD_REQUEST,
        }, HttpStatus.BAD_REQUEST)

        return await this.userModel
            .findOne({
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
    }
}
