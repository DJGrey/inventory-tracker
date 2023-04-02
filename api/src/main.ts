import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Endpoints start with /api/.
  app.setGlobalPrefix('api');

  // Validate DTOs with NestJS Validators.
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
