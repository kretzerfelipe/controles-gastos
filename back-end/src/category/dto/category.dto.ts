import { Category } from 'src/common/entities/category.entity';

export class CreateCategoryDto {
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

export class UpdateCategoryDto {
  name?: string;
  color?: string;
  icon?: string;
}

export class CategoryResponseDto {
  categories: Category[];

  constructor(categories: Category[]) {
    this.categories = categories;
  }
}

export class SingleCategoryResponseDto {
  category: Category;

  constructor(category: Category) {
    this.category = category;
  }
}
