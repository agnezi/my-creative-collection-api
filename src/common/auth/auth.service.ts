import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { BcryptConfigService } from '@app/bcrypt-config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/common/users/users.service';
import { CustomLoggerService } from 'src/config/custom-logger/custom-logger.service';
import { jwtConstants } from './constants';
import { Prisma } from '@prisma/client';
import { PrismaDbconfigService } from 'src/config/prisma-dbconfig/prisma-dbconfig.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaDbconfigService,
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

    this.loggerService.log('Pass regex');

    const user = await this.usersService.findOneAuth({
      username,
      email,
    });

    if (!user) {
      this.loggerService.log('User not found');

      throw HttpStatus.NOT_FOUND;
    }

    this.loggerService.log('User found');

    const passwordMatch = this.bcryptServiceConfig.comparePassword(
      pass,
      user.password,
    );

    if (!passwordMatch) {
      this.loggerService.log('Password not matched');

      throw new UnauthorizedException();
    }

    this.loggerService.log('Password matched');

    const payload = { username: user.username, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(
        {},
        {
          secret: jwtConstants.accessTokenSecret,
          expiresIn: '10s',
        },
      ),
      user_data_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.userDataTokenSecret,
        expiresIn: '10s',
      }),
      refresh_token: user.refreshToken,
    };
  }

  async signUp(data: Prisma.UserCreateInput) {
    const userExists = await this.prisma.user.findMany({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (userExists.length > 0) {
      throw new BadRequestException('User already exists');
    }

    const hash = this.bcryptServiceConfig.hashPassword(data.password);
    const refreshToken = await this.jwtService.signAsync(
      {},
      {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: '150d',
      },
    );

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hash,
        refreshToken,
      },
      select: {
        name: true,
        username: true,
        id: true,
        createdAt: true,
        email: true,
      },
    });

    return newUser;
  }
}
