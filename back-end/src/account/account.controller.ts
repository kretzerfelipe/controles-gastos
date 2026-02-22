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
import { AccountService } from './account.service';
import { type AuthenticatedRequest } from 'src/auth/auth.controller';
import { User } from 'src/common/entities/user.entity';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    const user: User = req.user;
    return this.accountService.findAllByUserId(user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: User = req.user;
    return this.accountService.create(createAccountDto, user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: User = req.user;
    return this.accountService.update(id, updateAccountDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: User = req.user;
    await this.accountService.delete(id, user.id);
  }
}
