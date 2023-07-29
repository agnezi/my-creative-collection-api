import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserFromToken } from './user-from-token.decorator';
import { UserJWT, UserTokensDto } from '../users/users.dto';
import { UserTokens } from './user-tokens.decorator';
import { Auth } from './auth.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(
      signInDto.usernameOrEmail,
      signInDto.password,
    );
  }

  @Post('sign-up')
  async create(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Auth()
  @Patch('refresh-token')
  async refreshToken(@UserFromToken() userData: UserJWT) {
    await this.authService.refreshToken(userData);
  }

  @Get('forgot-password')
  forgotPassword(@UserFromToken() userData: UserJWT) {
    return this.authService.forgotPassword(userData);
  }

  @Auth()
  @Get('check-auth')
  async checkAuth(@UserTokens() tokens: UserTokensDto) {
    return this.authService.checkAuth(tokens);
  }
}
