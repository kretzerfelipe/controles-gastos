import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { Account } from '../entities/account.entity';
import { AccountType } from '@prisma/client';

export interface IAccountRepository {
  findById(id: number): Promise<Account>;
  findAllByUserId(
    userId: number,
    type?: 'income' | 'expense' | 'all',
  ): Promise<Account[]>;
  create(
    description: string,
    openingBalance: number,
    openingBalanceDate: Date,
    bank: string | null,
    type: AccountType,
    color: string,
    userId: number,
  ): Promise<Account>;
  update(account: Account): Promise<Account>;
  delete(id: number): Promise<void>;
}

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Account> {
    const prismaAccount = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!prismaAccount) {
      return null;
    }

    return Account.fromPrisma(prismaAccount);
  }

  async findAllByUserId(userId: number): Promise<Account[]> {
    const prismaCategories = await this.prisma.account.findMany({
      where: { userId },
    });

    if (!prismaCategories) {
      return null;
    }

    return prismaCategories.map((c) => {
      return Account.fromPrisma(c);
    });
  }

  async create(
    description: string,
    openingBalance: number,
    openingBalanceDate: Date,
    bank: string | null,
    type: AccountType,
    color: string,
    userId: number,
  ): Promise<Account> {
    try {
      const prismaAccount = await this.prisma.account.create({
        data: {
          description,
          openingBalance,
          openingBalanceDate,
          bank,
          type,
          color,
          userId,
        },
      });

      return Account.fromPrisma(prismaAccount);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Account already exists');
      }
      throw error;
    }
  }

  async update({
    id,
    description,
    openingBalance,
    openingBalanceDate,
    bank,
    type,
    color,
  }: Account): Promise<Account> {
    try {
      const prismaAccount = await this.prisma.account.update({
        where: { id },
        data: {
          description,
          openingBalance,
          openingBalanceDate,
          bank,
          type,
          color,
        },
      });

      return Account.fromPrisma(prismaAccount);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException('Account not found');
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.account.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException('Account not found');
      }
      throw error;
    }
  }
}
