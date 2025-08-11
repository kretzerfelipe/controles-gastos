import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: env.FRONT_END_URL, // Coloque a URL do seu frontend aqui
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // se você precisar enviar cookies ou auth
  });

  await app.listen(3000);
}
bootstrap();
