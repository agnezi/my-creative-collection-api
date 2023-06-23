import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptConfigModule } from '@app/bcrypt-config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/common/users/users.module';
import { CustomLoggerModule } from 'src/config/custom-logger/custom-logger.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    CustomLoggerModule,
    BcryptConfigModule,
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
