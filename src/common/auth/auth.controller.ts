import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'x-user-token',
    required: true,
    allowEmptyValue: false,
    description: 'Custom token with user information',
  })
  @ApiHeader({
    name: 'x-refresh-token',
    required: true,
    allowEmptyValue: false,
    description: 'User refresh token',
  })
  @Patch('refresh-token')
  async refreshToken(@Req() request: Request) {
    const userToken = request?.headers['x-user-token'];

    if (typeof userToken === 'string') {
      return this.authService.refreshToken({
        userToken,
      });
    }
  }
}
