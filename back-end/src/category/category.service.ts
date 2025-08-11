import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../common/entities/category.entity';
import { CategoryRepository } from 'src/common/repositories/category.repository';
import {
  CategoryResponseDto,
  CreateCategoryDto,
  SingleCategoryResponseDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAllByUserId(userId: number): Promise<CategoryResponseDto> {
    const categories = await this.categoryRepository.findAllByUserId(userId);
    return new CategoryResponseDto(categories);
  }

  async create(
    createData: CreateCategoryDto,
    userId: number,
  ): Promise<SingleCategoryResponseDto> {
    const category = await this.categoryRepository.create(
      createData.name,
      createData.color,
      createData.icon,
      userId,
    );
    return new SingleCategoryResponseDto(category);
  }

  async update(
    id: number,
    updateData: UpdateCategoryDto,
    userId: number,
  ): Promise<SingleCategoryResponseDto> {
    const existingCategory = await this.verifyOwnership(id, userId);

    if (updateData.name !== undefined) {
      existingCategory.name = updateData.name;
    }
    if (updateData.color !== undefined) {
      existingCategory.color = updateData.color;
    }
    if (updateData.icon !== undefined) {
      existingCategory.icon = updateData.icon;
    }

    const updatedCategory =
      await this.categoryRepository.update(existingCategory);
    return new SingleCategoryResponseDto(updatedCategory);
  }

  async delete(categoryId: number, userId: number): Promise<void> {
    await this.verifyOwnership(categoryId, userId);

    await this.categoryRepository.delete(categoryId);
  }

  private async verifyOwnership(
    categoryId: number,
    userId: number,
  ): Promise<Category> {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category || category.userId !== userId) {
      throw new NotFoundException(
        'Category not found or does not belong to user',
      );
    }

    return category;
  }
}
