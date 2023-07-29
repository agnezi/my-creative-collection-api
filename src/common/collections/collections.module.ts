import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { PrismaDbconfigModule } from 'src/config/prisma-dbconfig/prisma-dbconfig.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CustomLoggerModule } from 'src/config/custom-logger/custom-logger.module';

@Module({
  imports: [PrismaDbconfigModule, CustomLoggerModule],
  controllers: [CollectionsController],
  providers: [
    CollectionsService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [CollectionsService],
})
export class CollectionsModule {}
