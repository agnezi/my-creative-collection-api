import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UserJWT } from './users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserFromToken } from '../auth/user-from-token.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  getProfile(@UserFromToken() user: UserJWT) {
    return user;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('user')
  async update(@UserFromToken() user: UserJWT, @Body() body: UpdateUserDto) {
    return this.usersService.update(user.id, body);
  }
}
