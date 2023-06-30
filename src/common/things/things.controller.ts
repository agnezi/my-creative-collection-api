import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ThingsService } from './things.service';
import { CreateThingDto, UpdateThingDto } from './things.dto';
import { Auth } from '../auth/auth.decorator';

@ApiTags('things')
@Controller('things')
@Auth()
export class ThingsController {
  constructor(private thingsService: ThingsService) {}

  @Get(':id')
  async things(@Param('id') id: string) {
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
}
