import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractAccessTokenFromHeader(request);
    const userDataToken = this.extractUserDataTokenFromHeader(request);
    const refreshToken = this.extractRefreshTokenFromHeader(request);

    if (!accessToken || !userDataToken || !refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.accessTokenSecret,
      });

      await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshTokenSecret,
      });

      const payload = await this.jwtService.verifyAsync(userDataToken, {
        secret: jwtConstants.userDataTokenSecret,
      });

      request['user'] = { username: payload.username, id: payload.id };
    } catch (error) {
      const payload = await this.jwtService.verifyAsync(userDataToken, {
        secret: jwtConstants.userDataTokenSecret,
      });

      this.authService.refreshToken(payload);
    }
    return true;
  }

  private extractAccessTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractUserDataTokenFromHeader(request: Request): string | undefined {
    const token = request.headers['x-user-token'] as string | undefined;
    return token;
  }

  private extractRefreshTokenFromHeader(request: Request): string | undefined {
    const token = request.headers['x-refresh-token'] as string | undefined;
    return token;
  }
}
