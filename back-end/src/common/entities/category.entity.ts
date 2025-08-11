import { Category as PrismaCategory } from '@prisma/client';

export class Category {
  private _id: number;
  private _name: string;
  private _color: string;
  private _icon: string;
  private _userId: number;
  private _createdAt: Date;

  constructor(
    id: number,
    name: string,
    color: string,
    icon: string,
    userId: number,
    createdAt?: Date,
  ) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._icon = icon;
    this._userId = userId;
    this._createdAt = createdAt || new Date();
  }

  static fromPrisma(prismaCategory: PrismaCategory): Category {
    return new Category(
      prismaCategory.id,
      prismaCategory.name,
      prismaCategory.color,
      prismaCategory.icon,
      prismaCategory.userId,
      prismaCategory.createdAt,
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

  get userId(): number {
    return this._userId;
  }

  get createdAt(): Date {
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
}
