import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
// import { TypeormStore } from 'connect-typeorm/out';
// import { getRepository } from 'typeorm';
// import { SessionEntity } from './modules/session/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  // const sessionRepository = getRepository(SessionEntity);
  app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000000,
    },
    // store: new TypeormStore().connect(sessionRepository),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(parseInt(process.env.PORT, 10) || 8000,);
}
bootstrap();
