import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { jwtConfig } from '../auth/utils/config/jwt.config';
import { CheckMiddleware } from './middlewares/CheckMiddleware';
import { AdminSession } from './entity/admin_session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminSession]),
    JwtModule.registerAsync(jwtConfig)
  ],
  providers: [AdminService,],
  controllers: [AdminController],
  exports: [AdminService]
})
export class AdminModule implements NestModule {
  configure(admin: MiddlewareConsumer) {
    admin
      .apply(CheckMiddleware)
      .forRoutes(AdminController);
  }
}
