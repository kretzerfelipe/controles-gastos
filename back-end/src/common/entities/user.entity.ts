export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _createdAt: Date;

  constructor(id: number, name: string, email: string, password: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._createdAt = new Date();
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

  toPublic(): object {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
    };
  }

  verifyPassword(password: string): boolean {
    return this._password === password;
  }
}
