import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from 'src/common/repositories/category.repository';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, PrismaService],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
