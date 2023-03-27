import { TaskBadges } from './entity/task_badge.entity';
import { Badge } from './entity/badge.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Project } from './entity/project.entity';
import { Tasks } from './entity/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { BadgeController } from './controller/badge/badge.controller';
import { TaskController } from './controller/task/task.controller';
import { BadgeService } from './service/badge/badge.service';
import { TaskService } from './service/task/task.service';
import { Team } from '../team/entity/team.entity';
import { ProjectTeams } from './entity/project_teams.entity';
import { Row } from './entity/row.entity';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectTeams, Team, Tasks, User, Badge, TaskBadges, Row]),
    ChatModule
  ],
  controllers: [ProjectController, BadgeController, TaskController],
  providers: [ProjectService, BadgeService, TaskService],
  exports: [ProjectService, BadgeService, TaskService]
})
export class ProjectModule {}
