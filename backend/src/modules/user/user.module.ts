import { AuthService } from './../auth/service/auth/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { jwtConfig } from '../auth/utils/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { Friend } from './entity/friends.entity';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friend]),
    JwtModule.registerAsync(jwtConfig),
    ChatModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
