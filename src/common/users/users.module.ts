import { BcryptConfigModule } from '@app/bcrypt-config';
import { Module } from '@nestjs/common';
import { PrismaDbconfigModule } from '../../config/prisma-dbconfig/prisma-dbconfig.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CustomLoggerModule } from 'src/config/custom-logger/custom-logger.module';

@Module({
  imports: [PrismaDbconfigModule, BcryptConfigModule, CustomLoggerModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
