import './env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions = {
    exposedHeaders: 'refresh_token',
  };

  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);

  app.useStaticAssets(join(__dirname, '..', 'static'));

  const config = new DocumentBuilder()
    .setTitle('AUCTION')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Borikin D.D.')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.SERVER_PORT);

  console.log(`App run on ${process.env.SERVER_PORT} port`)
}
bootstrap();
