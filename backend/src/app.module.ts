import { TeamModule } from './modules/team/team.module';
import { ProjectModule } from './modules/project/project.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entity/user.entity';
import { Team } from './modules/team/entity/team.entity';
import { Teams } from './modules/team/entity/teams.entity';
import { Badge } from './modules/project/entity/badge.entity';
import { ProjectTeams } from './modules/project/entity/project_teams.entity';
import { Project } from './modules/project/entity/project.entity';
import { Row } from './modules/project/entity/row.entity';
import { TaskBadges } from './modules/project/entity/task_badge.entity';
import { Tasks } from './modules/project/entity/tasks.entity';
import { UserTasks } from './modules/project/entity/user_task.entity';
import { AdminModule } from './modules/admin/admin.module';
import { Admin } from './modules/admin/entity/admin.entity';
import { AdminSession } from './modules/admin/entity/admin_session.entity';
import { ChatModule } from './modules/chat/chat.module';
import { Channel } from './modules/chat/entity/channel.entity';
import { Message } from './modules/chat/entity/message.entity';
import { Friend } from './modules/user/entity/friends.entity';

@Module({
  imports: [

    UserModule,
    ProjectModule,
    ChatModule,
    TeamModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Admin,
        AdminSession,
        Team,
        Teams,
        Badge,
        ProjectTeams,
        Project,
        Row,
        TaskBadges,
        Tasks,
        UserTasks,
        Channel,
        Message,
        Friend
      ],
      synchronize: true,
    }),
    AuthModule,
    AdminModule,

    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
