import { Module } from '@nestjs/common';
import { ThingsController } from './things.controller';
import { ThingsService } from './things.service';
import { PrismaDbconfigModule } from 'src/config/prisma-dbconfig/prisma-dbconfig.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UsersModule } from '../users/users.module';
import { CollectionsModule } from '../collections/collections.module';

@Module({
  imports: [PrismaDbconfigModule, UsersModule, CollectionsModule],
  controllers: [ThingsController],
  providers: [
    ThingsService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThingsModule {}
