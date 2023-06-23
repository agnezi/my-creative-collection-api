import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { BcryptConfigService } from '@app/bcrypt-config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/common/users/users.service';
import { CustomLoggerService } from 'src/config/custom-logger/custom-logger.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptServiceConfig: BcryptConfigService,
    private loggerService: CustomLoggerService,
  ) {}

  async signIn(usernameOrEmail: string, pass: string): Promise<any> {
    this.loggerService.log('Log in attempt');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email: string | undefined = undefined;
    let username: string | undefined = undefined;

    if (emailRegex.test(usernameOrEmail)) {
      email = usernameOrEmail;
    } else {
      username = usernameOrEmail;
    }

    const user = await this.usersService.findOneAuth({
      username,
      email,
    });

    if (!user) {
      throw HttpStatus.NOT_FOUND;
    }

    const passwordMatch = this.bcryptServiceConfig.comparePassword(
      pass,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(
        {},
        {
          secret: jwtConstants.secret,
        },
      ),
      user_data_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.userDataTokenSecret,
      }),
    };
  }
}
