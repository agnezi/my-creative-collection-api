import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BcryptConfigModule } from '@app/bcrypt-config';
import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';

import { PrismaDbconfigModule } from './config/prisma-dbconfig/prisma-dbconfig.module';
import { CollectionsModule } from './collections/collections.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BcryptConfigModule,
    PrismaDbconfigModule,
    CollectionsModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
