import './env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions = {
    exposedHeaders: 'refresh_token',
  };

  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);

  app.useStaticAssets(join(__dirname, '..', 'static'));

  await app.listen(process.env.SERVER_PORT);

  console.log('App run on 5000 port')
}
bootstrap();
