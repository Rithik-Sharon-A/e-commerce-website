import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import multipart from '@fastify/multipart';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(multipart);
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(4000, '0.0.0.0');
  console.log('Server started on PORT : 4000');
}
bootstrap();
