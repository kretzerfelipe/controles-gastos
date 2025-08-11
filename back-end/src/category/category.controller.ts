import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guards';
import { CategoryService } from './category.service';
import { type AuthenticatedRequest } from 'src/auth/auth.controller';
import { User } from 'src/common/entities/user.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':type')
  async findAll(
    @Param('type', ParseIntPipe) type: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: User = req.user;
    return this.categoryService.findAllByUserId(
      user.id,
      type === 'income' ? 'income' : type === 'expense' ? 'expense' : 'all',
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: User = req.user;
    return this.categoryService.create(createCategoryDto, user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: User = req.user;
    return this.categoryService.update(id, updateCategoryDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: User = req.user;
    await this.categoryService.delete(id, user.id);
  }
}
