import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { appConfig } from './config/config';

async function bootstrap() {
  // Cấu hình logger
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          winston.format.colorize(),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),
        ),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
    ],
  });

  // Tạo ứng dụng với logger
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // Cấu hình validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Cấu hình versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Lunar Calendar API')
    .setDescription('API documentation for Lunar Calendar application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(appConfig.KEY);
  await app.listen(configService.port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
