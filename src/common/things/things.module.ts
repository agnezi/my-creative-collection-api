import { Module } from '@nestjs/common';
import { ThingsController } from './things.controller';
import { ThingsService } from './things.service';
import { PrismaDbconfigModule } from 'src/config/prisma-dbconfig/prisma-dbconfig.module';
import { UsersModule } from '../users/users.module';
import { CollectionsModule } from '../collections/collections.module';
import { CustomLoggerModule } from 'src/config/custom-logger/custom-logger.module';

@Module({
  imports: [
    PrismaDbconfigModule,
    UsersModule,
    CollectionsModule,
    CustomLoggerModule,
  ],
  controllers: [ThingsController],
  providers: [ThingsService],
})
export class ThingsModule {}
