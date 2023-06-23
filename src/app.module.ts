import { AppController } from './app.controller';
import { AuthModule } from './common/auth/auth.module';
import { BcryptConfigModule } from '@app/bcrypt-config';
import { Module } from '@nestjs/common';

import { UsersModule } from './common/users/users.module';

import { PrismaDbconfigModule } from './config/prisma-dbconfig/prisma-dbconfig.module';
import { CollectionsModule } from './common/collections/collections.module';
import { CustomLoggerModule } from './config/custom-logger/custom-logger.module';

import { ThrottlerModule } from '@nestjs/throttler';
import { ThingsModule } from './common/things/things.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
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
