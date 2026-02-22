import { Account as PrismaAccount, AccountType } from '@prisma/client';

export class Account {
  private _id: number;
  private _description: string;
  private _openingBalance: number;
  private _openingBalanceDate: Date;
  private _bank: string | null;
  private _type: AccountType;
  private _color: string;
  private _userId: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: {
    id: number;
    description: string;
    openingBalance: number;
    openingBalanceDate: Date;
    bank?: string | null;
    type: AccountType;
    color: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._description = props.description;
    this._openingBalance = props.openingBalance;
    this._openingBalanceDate = props.openingBalanceDate;
    this._bank = props.bank || null;
    this._type = props.type;
    this._color = props.color;
    this._userId = props.userId;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  static fromPrisma(prismaAccount: PrismaAccount): Account {
    return new Account({
      id: prismaAccount.id,
      description: prismaAccount.description,
      openingBalance: Number(prismaAccount.openingBalance),
      openingBalanceDate: prismaAccount.openingBalanceDate,
      bank: prismaAccount.bank,
      type: prismaAccount.type,
      color: prismaAccount.color,
      userId: prismaAccount.userId,
      createdAt: prismaAccount.createdAt,
      updatedAt: prismaAccount.updatedAt,
    });
  }

  get id(): number {
    return this._id;
  }

  get description(): string {
    return this._description;
  }

  get openingBalance(): number {
    return this._openingBalance;
  }

  get openingBalanceDate(): Date {
    return this._openingBalanceDate;
  }

  get bank(): string | null {
    return this._bank;
  }

  get type(): AccountType {
    return this._type;
  }

  get color(): string {
    return this._color;
  }

  get userId(): number {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set description(value: string) {
    this._description = value;
  }

  set openingBalance(value: number) {
    this._openingBalance = value;
    this._touch();
  }

  set openingBalanceDate(value: Date) {
    this._openingBalanceDate = value;
    this._touch();
  }

  set bank(value: string | null) {
    this._bank = value;
    this._touch();
  }

  set type(value: AccountType) {
    this._type = value;
    this._touch();
  }

  set color(value: string) {
    this._color = value;
    this._touch();
  }

  private _touch() {
    this._updatedAt = new Date();
  }
}
