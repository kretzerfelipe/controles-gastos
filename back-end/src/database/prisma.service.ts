import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const adapter = new PrismaLibSQL({
      url: configService.get<string>('TURSO_DATABASE_URL'),
      authToken: configService.get<string>('TURSO_AUTH_TOKEN'),
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
