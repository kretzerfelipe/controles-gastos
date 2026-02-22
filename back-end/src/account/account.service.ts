import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../common/entities/account.entity';
import { AccountRepository } from 'src/common/repositories/account.repository';
import {
  AccountResponseDto,
  CreateAccountDto,
  SingleAccountResponseDto,
  UpdateAccountDto,
} from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findAllByUserId(userId: number): Promise<AccountResponseDto> {
    const categories = await this.accountRepository.findAllByUserId(userId);
    return new AccountResponseDto(categories);
  }

  async create(
    createData: CreateAccountDto,
    userId: number,
  ): Promise<SingleAccountResponseDto> {
    const account = await this.accountRepository.create(
      createData.description,
      createData.openingBalance,
      createData.openingBalanceDate,
      createData.bank,
      createData.type,
      createData.color,
      userId,
    );
    return new SingleAccountResponseDto(account);
  }

  async update(
    id: number,
    updateData: UpdateAccountDto,
    userId: number,
  ): Promise<SingleAccountResponseDto> {
    const existingAccount = await this.verifyOwnership(id, userId);

    const updatedAccount = await this.accountRepository.update(existingAccount);

    if (updateData.description !== undefined) {
      existingAccount.description = updateData.description;
    }

    if (updateData.openingBalance !== undefined) {
      existingAccount.openingBalance = updateData.openingBalance;
    }

    if (updateData.openingBalanceDate !== undefined) {
      existingAccount.openingBalanceDate = updateData.openingBalanceDate;
    }

    if (updateData.bank !== undefined) {
      existingAccount.bank = updateData.bank;
    }

    if (updateData.type !== undefined) {
      existingAccount.type = updateData.type;
    }

    if (updateData.color !== undefined) {
      existingAccount.color = updateData.color;
    }

    return new SingleAccountResponseDto(updatedAccount);
  }

  async delete(accountId: number, userId: number): Promise<void> {
    await this.verifyOwnership(accountId, userId);

    await this.accountRepository.delete(accountId);
  }

  private async verifyOwnership(
    accountId: number,
    userId: number,
  ): Promise<Account> {
    const account = await this.accountRepository.findById(accountId);

    if (!account || account.userId !== userId) {
      throw new NotFoundException(
        'Account not found or does not belong to user',
      );
    }

    return account;
  }
}
