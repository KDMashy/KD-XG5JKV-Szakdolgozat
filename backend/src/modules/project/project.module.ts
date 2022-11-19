import { ProjectBadge } from './entity/project_badge.entity';
import { TaskBadges } from './entity/task_badge.entity';
import { Badge } from './entity/badge.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { ProjectTasks } from './entity/project_tasks.entity';
import { Project } from './entity/project.entity';
import { Projects } from './entity/projects.entity';
import { Tasks } from './entity/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { BadgeController } from './controller/badge/badge.controller';
import { TaskController } from './controller/task/task.controller';
import { BadgeService } from './service/badge/badge.service';
import { TaskService } from './service/task/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projects, Project, ProjectTasks, Tasks, User, Badge, TaskBadges, ProjectBadge])
  ],
  controllers: [ProjectController, BadgeController, TaskController],
  providers: [ProjectService, BadgeService, TaskService],
  exports: [ProjectService, BadgeService, TaskService]
})
export class ProjectModule {}
