import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // torna disponível em todo o app
  }),
    AuthModule, CategoryModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
