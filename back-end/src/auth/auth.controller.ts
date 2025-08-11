import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  AuthResponseDto,
  UpdateUserDto,
} from './dto/auth.dto';
import { User } from '../common/entities/user.entity';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from './guards/auth.guards';

interface AuthenticatedRequest extends ExpressRequest {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Request() req: AuthenticatedRequest) {
    const user: User = req.user;
    return {
      message: 'Usuário autenticado com sucesso!',
      user: user.toPublic(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateCurrentUser(
    @Request() req: AuthenticatedRequest,
    @Body() updateData: UpdateUserDto, // DTO específico para update
  ) {
    const userId = req.user.id;

    // Chama o service para atualizar o usuário
    const updatedUser = await this.authService.updateUser(userId, updateData);

    return {
      message: 'Usuário atualizado com sucesso!',
      user: updatedUser.toPublic(),
    };
  }
}
