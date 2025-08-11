export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
}

export class AuthResponseDto {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  };

  constructor(
    accessToken: string,
    user: {
      id: number;
      name: string;
      email: string;
      createdAt: Date;
    },
  ) {
    this.access_token = accessToken;
    this.user = user;
  }
}
