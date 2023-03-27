import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: config.corsOrigin,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3001);
}
bootstrap();
