import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/common/repositories/user.repository';
import {
  AuthResponseDto,
  LoginDto,
  RegisterDto,
  UpdateUserDto,
} from './dto/auth.dto';
import { User } from 'src/common/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);

    if (user && (await user.verifyPassword(password))) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload);

    this.jwtService.sign(payload, { expiresIn: '168h' });

    return new AuthResponseDto(accessToken, user.toPublic());
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { name, email, password } = registerDto;

    // O repository já lida com a verificação de email existente e hash da senha
    const user = await this.userRepository.create(name, email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload);

    return new AuthResponseDto(accessToken, user.toPublic());
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    // Atualize os campos permitidos
    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;

    // Atualize no banco (dependendo de como seu repositório funciona)
    await this.userRepository.save(user);

    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }
}
