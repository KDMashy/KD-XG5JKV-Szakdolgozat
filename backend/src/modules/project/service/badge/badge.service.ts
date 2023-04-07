import { CreateBadgeDto, UpdateBadgeDto } from './../../dto/badge.dto';
import { TaskBadges } from './../../entity/task_badge.entity';
import { Badge } from './../../entity/badge.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BadgeService {
    constructor (
        @InjectRepository(Badge)
        private badgeModel: Repository<Badge>,
        @InjectRepository(TaskBadges)
        private taskBadgesModel: Repository<TaskBadges>,
    ) {}

    async index(id) {
        if(!id) return HttpStatus.BAD_REQUEST
        return await this.badgeModel.find({
            where: {project: id},
            relations: [
                'badge_creator',
                'project',
                'task',
                'task.task'
            ]
        })
    }

    async getOneById(id: number) {
        return await this.badgeModel.findOne({
            where: { id: id },
            relations: [
                'badge_creator',
                'project',
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
            badge_color: badge.badge_color,
            project: badge.project ? badge.project : null
        })
        let response: Badge = await newBadge.save()
        if(response) {
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
                'badge_creator',
                'project',
                'task',
                'task.task'
            ]
        })
    }

    async addOrDeleteBadgeFromTask (type: "add" | "delete", req) {
        if (type === "add") {
            await this.taskBadgesModel.create({
                task: req.task,
                badge: req.id
            }).save()
        } else {
            let connection = await this.taskBadgesModel.findOne({
                where: {id: req?.id}
            })
            if(!connection) return HttpStatus.BAD_REQUEST
            await this.taskBadgesModel.remove(connection)
        }
    }

    async updateBadge(badge: UpdateBadgeDto, id: number) {
        const editBadge: Badge = await this.badgeModel.findOne({
            where: { id: id },
            relations: [
                'badge_creator',
                'project',
                'task',
                'task.task'
            ]
        })
        editBadge.badge_label = badge.badge_label
        editBadge.badge_creator = badge.badge_creator
        editBadge.badge_only_creator = badge.badge_only_creator
        editBadge.badge_color = badge.badge_color
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
