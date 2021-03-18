import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
