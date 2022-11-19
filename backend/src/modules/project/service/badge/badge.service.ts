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
}
