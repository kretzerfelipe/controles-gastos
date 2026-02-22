import { Account } from 'src/common/entities/account.entity';

export class LoginDto {
  email: string;
  password: string;
}

export class CreateAccountDto {
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

export class UpdateAccountDto {
  name?: string;
  color?: string;
  icon?: string;
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
