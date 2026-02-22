import { AccountType } from '@prisma/client';
import { Account } from 'src/common/entities/account.entity';

export class CreateAccountDto {
  description: string;
  openingBalance: number;
  openingBalanceDate: Date;
  bank: string | null;
  type: AccountType;
  color: string;
  userId: number;
}

export class UpdateAccountDto {
  description?: string;
  openingBalance?: number;
  openingBalanceDate?: Date;
  bank?: string | null;
  type?: AccountType;
  color?: string;
}

export class AccountResponseDto {
  categories: Account[];

  constructor(categories: Account[]) {
    this.categories = categories;
  }
}

export class SingleAccountResponseDto {
  account: Account;

  constructor(account: Account) {
    this.account = account;
  }
}
