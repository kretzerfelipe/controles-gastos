import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  findById(id: number): Promise<Category>;
  findAllByUserId(
    userId: number,
    type?: 'income' | 'expense' | 'all',
  ): Promise<Category[]>;
  create(
    name: string,
    color: string,
    icon: string,
    type: 'income' | 'expense',
    userId: number,
  ): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<void>;
}

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Category> {
    const prismaCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!prismaCategory) {
      return null;
    }

    return Category.fromPrisma(prismaCategory);
  }

  async findAllByUserId(
    userId: number,
    type?: 'income' | 'expense' | 'all',
  ): Promise<Category[]> {
    const finalType =
      type === 'income'
        ? 'income'
        : type === 'expense'
          ? 'exmpense'
          : undefined;
    const prismaCategories = await this.prisma.category.findMany({
      where: { userId, ...(finalType ? { type: finalType } : {}) },
    });

    if (!prismaCategories) {
      return null;
    }

    return prismaCategories.map((c) => {
      return Category.fromPrisma(c);
    });
  }

  async create(
    name: string,
    color: string,
    icon: string,
    type: 'income' | 'expense',
    userId: number,
  ): Promise<Category> {
    try {
      const prismaCategory = await this.prisma.category.create({
        data: {
          name,
          color,
          icon,
          type,
          userId,
        },
      });

      return Category.fromPrisma(prismaCategory);
    } catch (error) {
      // Se for erro de unique constraint do Prisma
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Category already exists');
      }
      throw error;
    }
  }

  async update(category: Category): Promise<Category> {
    try {
      const prismaCategory = await this.prisma.category.update({
        where: { id: category.id },
        data: {
          name: category.name,
          color: category.color,
          icon: category.icon,
        },
      });

      return Category.fromPrisma(prismaCategory);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException('Category not found');
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException('Category not found');
      }
      throw error;
    }
  }
}
