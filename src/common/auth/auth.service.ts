import {
  HttpException,
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
import { UpdateUserDto, UserJWT, UserTokensDto } from '../users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaDbconfigService,
    private jwtService: JwtService,
    private bcryptServiceConfig: BcryptConfigService,
    private loggerService: CustomLoggerService,
  ) {}

  private async generateNewAccessToken() {
    return await this.jwtService.signAsync(
      {},
      {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: '12h',
      },
    );
  }

  private async generateNewRefreshToken() {
    return await this.jwtService.signAsync(
      {},
      {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: '30d',
      },
    );
  }

  private async generateNewUserToken(payload: {
    id: string;
    username: string;
  }) {
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.userDataTokenSecret,
      expiresIn: '12h',
    });
  }

  private async verifyTokens(payload: UserTokensDto) {
    await this.jwtService.verifyAsync(payload.access_token, {
      secret: jwtConstants.accessTokenSecret,
    });

    await this.jwtService.verifyAsync(payload.user_data_token, {
      secret: jwtConstants.userDataTokenSecret,
    });

    await this.jwtService.verifyAsync(payload.refresh_token, {
      secret: jwtConstants.refreshTokenSecret,
    });

    return true;
  }

  public async signIn(usernameOrEmail: string, pass: string): Promise<any> {
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
      access_token: await this.generateNewAccessToken(),
      user_token: await this.generateNewUserToken(payload),
      refresh_token: user.refreshToken,
    };
  }

  public async signUp(data: Prisma.UserCreateInput) {
    this.loggerService.log('sign-up-service');

    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (userExists) {
      this.loggerService.log('user-already-exists');
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    this.loggerService.log('user-not-exists');

    const hash = this.bcryptServiceConfig.hashPassword(data.password);
    const refreshToken = await this.generateNewRefreshToken();

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
    this.loggerService.log('created-user');
    return newUser;
  }

  public async refreshToken(userData: UserJWT) {
    const newRefreshToken = await this.generateNewRefreshToken();

    const user = await this.usersService.updateRefreshToken(
      userData.id,
      newRefreshToken,
    );

    return {
      access_token: await this.generateNewAccessToken(),
      user_token: await this.generateNewUserToken({
        id: userData.id,
        username: userData.username,
      }),
      refresh_token: user.refreshToken,
    };
  }

  public async forgotPassword(userData: UserJWT) {
    console.log(userData);
  }

  public async checkAuth(tokens: UserTokensDto) {
    return this.verifyTokens(tokens);
  }

  public async update(userId: string, body: UpdateUserDto) {
    if (
      (body.newPassword && !body.confirmNewPassword) ||
      (!body.newPassword && body.confirmNewPassword)
    )
      throw new HttpException(
        'Missing password or confirmPassword',
        HttpStatus.BAD_REQUEST,
      );

    const hash = this.bcryptServiceConfig.hashPassword(
      body.newPassword as string,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name,
        password: hash,
      },
      select: {
        id: true,
        name: true,
      },
    });

    this.loggerService.log('updated-user', userId);
    return updatedUser;
  }
}
