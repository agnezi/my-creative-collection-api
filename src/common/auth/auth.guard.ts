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

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.accessTokenSecret,
      });

      request['user'] = { username: payload.username, id: payload.id };
      request['tokens'] = {
        access_token: accessToken,
      };
      console.log(request['user']);
    } catch (error) {
      console.log('some error has ocurred with the token');
      return false;
    }
    return true;
  }

  private extractAccessTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
