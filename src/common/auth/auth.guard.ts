import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractAccessTokenFromHeader(request);
    const userDataToken = this.extractUserDataTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    if (!userDataToken) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.secret,
      });

      const payload = await this.jwtService.verifyAsync(userDataToken, {
        secret: jwtConstants.userDataTokenSecret,
      });

      request['user'] = { username: payload.username, id: payload.id };
    } catch {
      throw new UnauthorizedException();
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
}
