import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
  create(name: string, email: string, password: string): Promise<User>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!prismaUser) {
      return null;
    }

    return User.fromPrisma(prismaUser);
  }

  async findById(id: number): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!prismaUser) {
      return null;
    }

    return User.fromPrisma(prismaUser);
  }

  async save(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
      },
    });

    return User.fromPrisma(updatedUser);
  }

  async create(name: string, email: string, password: string): Promise<User> {
    // Verifica se o email já existe
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const prismaUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return User.fromPrisma(prismaUser);
    } catch (error) {
      // Se for erro de unique constraint do Prisma
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
}
