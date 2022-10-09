import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { JwtStrategy } from './utils/strategy/jwt.strategy';
import { LocalStrategy } from './utils/strategy/local.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { jwtConfig } from './utils/config/jwt.config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
  ],
  exports: [AuthService],

})
export class AuthModule {}
