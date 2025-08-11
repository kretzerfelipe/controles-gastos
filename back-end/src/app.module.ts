import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, CategoryModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
