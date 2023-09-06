import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ThingsService } from './things.service';
import { CreateThingDto, UpdateThingDto } from './things.dto';
import { Auth } from '../auth/auth.decorator';
import { UserFromToken } from '../auth/user-from-token.decorator';
import { UserJWT } from '../users/users.dto';

@ApiTags('things')
@Controller('things')
@Auth()
export class ThingsController {
  constructor(private thingsService: ThingsService) {}

  @Get(':collectionId')
  async things(@Param('collectionId') id: string) {
    return this.thingsService.things(id);
  }

  @Post('create')
  async create(@Body() data: CreateThingDto) {
    return this.thingsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateThingDto) {
    return this.thingsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @UserFromToken() user: UserJWT) {
    return this.thingsService.delete(id, user);
  }
}
