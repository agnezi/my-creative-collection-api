import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UserJWT } from './users.dto';
import { ApiTags } from '@nestjs/swagger';

import { UserFromToken } from '../auth/user-from-token.decorator';
import { Auth } from '../auth/auth.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Auth()
  @Get('me')
  getProfile(@UserFromToken() user: UserJWT) {
    console.log(user);
    return user;
  }

  @Auth()
  @Patch('user')
  async update(@UserFromToken() user: UserJWT, @Body() body: UpdateUserDto) {
    return this.usersService.update(user.id, body);
  }
}
