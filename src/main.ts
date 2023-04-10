import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from './config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: config.corsOrigin,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
        disableErrorMessages: true,

        whitelist: true,
        forbidNonWhitelisted: true,

        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        }
    })
  )

  app.setGlobalPrefix(config.prefixPath);

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3001);
}
bootstrap();
