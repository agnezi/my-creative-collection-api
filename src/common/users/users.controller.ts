import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserJWT } from './users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../../config/user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('user')
  async findOne(@User() user: UserJWT) {
    return this.usersService.findOne(user);
  }

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
}
