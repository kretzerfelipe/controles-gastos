import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from 'src/common/repositories/account.repository';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, PrismaService],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}
