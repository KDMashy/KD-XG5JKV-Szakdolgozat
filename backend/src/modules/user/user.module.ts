import { AuthService } from './../auth/service/auth/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { jwtConfig } from '../auth/utils/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig)
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
