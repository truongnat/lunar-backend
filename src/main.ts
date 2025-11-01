import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { constants } from 'zlib'; // Dùng để truy cập các hằng số của Brotli
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

  // Lấy config service
  const configService = app.get(ConfigService);

  // Cấu hình bảo mật với Helmet
  app.use(helmet());

  // Cấu hình CORS
  const corsConfig = configService.get('security.cors');
  if (corsConfig?.enabled) {
    app.enableCors({
      origin: corsConfig.origin,
      methods: corsConfig.methods.split(','),
      credentials: corsConfig.credentials,
    });
  }

  app.use(
    compression({
      // 1. Cấu hình Chung
      threshold: 1024, // Chỉ nén các phản hồi lớn hơn 1KB

      // 2. Cấu hình Brotli (Nếu trình duyệt hỗ trợ Brotli, nó sẽ sử dụng cấu hình này)
      brotli: {
        params: {
          // Mức nén tốt nhất (chậm hơn, nhưng giảm kích thước tối đa)
          [constants.BROTLI_PARAM_QUALITY]: 11,

          // Chế độ nén Text (tối ưu cho web)
          [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,

          // Kích thước cửa sổ trượt lớn nhất
          [constants.BROTLI_PARAM_LGWIN]: 24,
        },
      },

      // 3. Cấu hình Gzip/Deflate (Nếu trình duyệt KHÔNG hỗ trợ Brotli, nó sẽ dùng cấu hình này)
      level: 6, // Mức nén Gzip/Deflate mặc định
    }),
  );

  // Cấu hình validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

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
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<number>('app.port')!);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
