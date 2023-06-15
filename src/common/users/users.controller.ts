import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserJWT } from './users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserFromToken } from '../auth/user-from-token.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('user')
  async findOne(@UserFromToken() user: UserJWT) {
    return this.usersService.findOne(user.id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('user')
  async update(@UserFromToken() user: UserJWT, @Body() body: UpdateUserDto) {
    return this.usersService.update(user.id, body);
  }

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
}
