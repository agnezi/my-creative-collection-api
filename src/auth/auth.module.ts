import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptConfigModule } from '@app/bcrypt-config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { CustomLoggerModule } from 'src/custom-logger/custom-logger.module';

@Module({
  imports: [
    CustomLoggerModule,
    BcryptConfigModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
