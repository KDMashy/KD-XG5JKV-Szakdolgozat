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

@Module({
  imports: [
    TypeOrmModule.forFeature([Projects, Project, ProjectTasks, Tasks, User, Badge, TaskBadges, ProjectBadge])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
