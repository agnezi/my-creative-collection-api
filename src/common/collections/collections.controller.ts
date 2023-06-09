import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { User } from 'src/config/user.decorator';
import { UserJWT } from 'src/common/users/users.dto';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto, UpdateCollectionDto } from './collections.dto';

@ApiTags('collections')
@Controller('collections')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post('create')
  async create(@Body() body: CreateCollectionDto, @User() user: UserJWT) {
    return this.collectionsService.create(body, user);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) collectionId: number,
    @Body() collection: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(collectionId, collection);
  }

  @Get()
  async collections(@User() user: UserJWT) {
    return this.collectionsService.collections(user.id);
  }

  @Get(':id')
  async collection(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.collection(id);
  }
}
