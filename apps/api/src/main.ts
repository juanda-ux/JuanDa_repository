import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadConfig } from '@websmith/config';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const env = loadConfig();
  await app.register(cors, { origin: env.APP_DOMAIN, credentials: true });
  await app.register(helmet);
  await app.register(rateLimit, { max: Number(env.RATE_LIMIT_MAX ?? 100), timeWindow: `${env.RATE_LIMIT_WINDOW ?? 60} seconds` });
  await app.register(cookie, { secret: env.CSRF_SECRET });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('WebSmith Studio API')
    .setDescription('Contratos REST para proyectos, generación y despliegue')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen({ port: 4000, host: '0.0.0.0' });
}

bootstrap();
