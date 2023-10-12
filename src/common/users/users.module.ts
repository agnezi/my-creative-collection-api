import { BcryptConfigModule } from '@app/bcrypt-config';
import { Module } from '@nestjs/common';
import { PrismaDbconfigModule } from '../../config/prisma-dbconfig/prisma-dbconfig.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CustomLoggerModule } from '../../config/custom-logger/custom-logger.module';

@Module({
  imports: [PrismaDbconfigModule, BcryptConfigModule, CustomLoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
