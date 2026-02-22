import * as bcrypt from 'bcrypt';
import { User as PrismaUser } from '@prisma/client';

export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  // Factory method para criar User a partir do Prisma
  static fromPrisma(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set name(newName: string) {
    this._name = newName;
  }

  set email(newEmail: string) {
    this._email = newEmail;
  }

  set password(newPassword: string) {
    this._password = newPassword;
  }

  toPublic(): { id: number; name: string; email: string; createdAt: Date } {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
    };
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this._password);
  }

  async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this._password = await bcrypt.hash(this._password, saltRounds);
  }

  static async createWithHashedPassword(
    id: number,
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = new User(id, name, email, password);
    await user.hashPassword();
    return user;
  }
}
