import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { BcryptConfigService } from '@app/bcrypt-config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptServiceConfig: BcryptConfigService,
  ) {}

  async signIn(userLoginText: string, pass: string): Promise<any> {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email: string | undefined = undefined;
    let username: string | undefined = undefined;

    if (emailRegex.test(userLoginText)) {
      email = userLoginText;
    } else {
      username = userLoginText;
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
      acces_token: await this.jwtService.signAsync(payload),
    };
  }
}