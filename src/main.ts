import * as fs from 'fs';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { CustomLoggerService } from './config/custom-logger/custom-logger.service';
import { AppModule } from './common/app/app.module';

async function bootstrap() {
  const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
  const appVersion = packageJson.version;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
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
    .setExternalDoc('Swagger-Postman', '/docs-json')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  console.log(`server started at port ${process.env.PORT}`);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
