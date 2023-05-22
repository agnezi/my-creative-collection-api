import { BcryptConfigModule } from '@app/bcrypt-config';
import { Module } from '@nestjs/common';
import { PrismaDbconfigModule } from '../config/prisma-dbconfig/prisma-dbconfig.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaDbconfigModule, BcryptConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
