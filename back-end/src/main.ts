import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  const frontendUrl = configService.get<string>('FRONT_END_URL')

  app.enableCors({
    origin: frontendUrl, // Coloque a URL do seu frontend aqui
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // se você precisar enviar cookies ou auth
  });

  await app.listen(3000);
}
bootstrap();
