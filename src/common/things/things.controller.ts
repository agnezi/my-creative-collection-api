import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ThingsService } from './things.service';
import { CreateThingDto, UpdateThingDto } from './things.dto';

@ApiTags('things')
@Controller('things')
@UseGuards(AuthGuard)
@ApiBearerAuth()
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
