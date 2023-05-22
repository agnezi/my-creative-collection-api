import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BcryptConfigModule } from '@app/bcrypt-config';
import { Module } from '@nestjs/common';
import { PrismaConfigModule } from './config/prisma-config/prisma-config.module';
import { UsersModule } from './users/users.module';
import { PrismaConfigModuleModule } from './config/prisma-config-module/prisma-config-module.module';
import { PrismaDbconfigModule } from './config/prisma-dbconfig/prisma-dbconfig.module';

@Module({
  imports: [UsersModule, PrismaConfigModule, AuthModule, BcryptConfigModule, PrismaConfigModuleModule, PrismaDbconfigModule],
  controllers: [AppController],
})
export class AppModule {}
