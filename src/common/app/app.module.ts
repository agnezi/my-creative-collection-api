import { AppController } from './app.controller';

import { BcryptConfigModule } from '@app/bcrypt-config';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaDbconfigModule } from 'src/config/prisma-dbconfig/prisma-dbconfig.module';
import { CollectionsModule } from '../collections/collections.module';
import { CustomLoggerModule } from 'src/config/custom-logger/custom-logger.module';
import { ThingsModule } from '../things/things.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BcryptConfigModule,
    PrismaDbconfigModule,
    CollectionsModule,
    CustomLoggerModule,
    ThingsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
