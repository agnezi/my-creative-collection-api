import * as fs from 'fs';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { CustomLoggerService } from './config/custom-logger/custom-logger.service';

async function bootstrap() {
  const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
  const appVersion = packageJson.version;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLoggerService));
  app.use(helmet());
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('My creative collection API')
    .setDescription('Documentation with ALL public endpoints')
    .setVersion(appVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  console.log(`server started at port ${process.env.PORT}`);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
