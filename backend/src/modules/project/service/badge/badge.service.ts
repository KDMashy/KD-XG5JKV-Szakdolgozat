import { CreateBadgeDto, UpdateBadgeDto } from './../../dto/badge.dto';
import { ProjectBadge } from './../../entity/project_badge.entity';
import { TaskBadges } from './../../entity/task_badge.entity';
import { Badge } from './../../entity/badge.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BadgeService {
    constructor (
        @InjectRepository(Badge)
        private badgeModel: Repository<Badge>,
        @InjectRepository(TaskBadges)
        private taskBadgesModel: Repository<TaskBadges>,
        @InjectRepository(ProjectBadge)
        private projectBadges: Repository<ProjectBadge>
    ) {}

    async index() {
        return await this.badgeModel.find({
            relations: [
                'project',
                'project.project',
                'task',
                'task.task'
            ]
        })
    }

    async getOneById(id: number) {
        return await this.badgeModel.findOne({
            where: { id: id },
            relations: [
                'project',
                'project.project',
                'task',
                'task.task'
            ]
        })
    }

    async createBadge(badge: CreateBadgeDto) {
        const newBadge = this.badgeModel.create({
            badge_label: badge.badge_label,
            badge_creator: badge.badge_creator,
            badge_only_creator: badge.badge_only_creator,
        })
        let response: Badge = await newBadge.save()
        if(response) {
            if(badge.project) {
                await this.projectBadges.create({
                    project: badge.project,
                    badge: response.id
                }).save()
            }
            if(badge.task) {
                await this.taskBadgesModel.create({
                    task: badge.task,
                    badge: response.id
                }).save()
            }
        }
        return await this.badgeModel.find({
            where: { id: response.id },
            relations: [
                'project',
                'project.project',
                'task',
                'task.task'
            ]
        })
    }

    async updateBadge(badge: UpdateBadgeDto, id: number) {
        const editBadge: Badge = await this.badgeModel.findOne({
            where: { id: id },
            relations: [
                'project',
                'project.project',
                'task',
                'task.task'
            ]
        })
        editBadge.badge_label = badge.badge_label
        editBadge.badge_creator = badge.badge_creator
        editBadge.badge_only_creator = badge.badge_only_creator
        let response = await editBadge.save()
        return response
    }

    async deleteBadge(id: number) {
        return await this.badgeModel
            .createQueryBuilder()
            .delete()
            .from(Badge)
            .where('id = :id', { id: id })
            .execute()
    }
}
