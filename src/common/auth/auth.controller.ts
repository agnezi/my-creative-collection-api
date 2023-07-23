import {
  Body,
  Controller,
  Get,
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
import { UserFromToken } from './user-from-token.decorator';
import { UserJWT } from '../users/users.dto';

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
  async refreshToken(@UserFromToken() userData: UserJWT) {
    await this.authService.refreshToken(userData);
  }

  @Get('forgot-password')
  forgotPassword(@UserFromToken() userData: UserJWT) {
    return this.authService.forgotPassword(userData);
  }
}
