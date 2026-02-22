import { Category as PrismaCategory } from '@prisma/client';

export class Category {
  private _id: number;
  private _name: string;
  private _color: string;
  private _icon: string;
  private _type: 'income' | 'expense';
  private _userId: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: number,
    name: string,
    color: string,
    icon: string,
    type: 'income' | 'expense',
    userId: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._icon = icon;
    this._type = type;
    this._userId = userId;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  static fromPrisma(prismaCategory: PrismaCategory): Category {
    return new Category(
      prismaCategory.id,
      prismaCategory.name,
      prismaCategory.color,
      prismaCategory.icon,
      prismaCategory.type as 'income' | 'expense',
      prismaCategory.userId,
      prismaCategory.createdAt,
      prismaCategory.updatedAt,
    );
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get color(): string {
    return this._color;
  }

  get icon(): string {
    return this._icon;
  }

  get type(): 'income' | 'expense' {
    return this._type;
  }

  get userId(): number {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._createdAt;
  }

  set name(newName: string) {
    this._name = newName;
  }

  set color(newColor: string) {
    this._color = newColor;
  }

  set icon(newIcon: string) {
    this._icon = newIcon;
  }

  set userId(newUserId: number) {
    this._userId = newUserId;
  }

  private _touch() {
    this._updatedAt = new Date();
  }
}
