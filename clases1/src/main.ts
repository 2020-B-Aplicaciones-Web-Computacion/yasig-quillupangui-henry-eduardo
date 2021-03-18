import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var fileStoreOprions = {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    store: new FileStore(fileStoreOprions),
    secret: 'SUPER SECRETO'
  }))
  app.use(cookieParser());
  app.use(helmet());

  await app.listen(3000);
}

bootstrap();
