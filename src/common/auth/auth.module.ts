import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptConfigModule } from '@app/bcrypt-config';
import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { UsersModule } from 'src/common/users/users.module';
import { CustomLoggerModule } from 'src/config/custom-logger/custom-logger.module';
import { PrismaDbconfigModule } from 'src/config/prisma-dbconfig/prisma-dbconfig.module';
@Global()
@Module({
  imports: [
    PrismaDbconfigModule,
    CustomLoggerModule,
    BcryptConfigModule,
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
