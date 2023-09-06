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
import { UserFromToken } from 'src/common/auth/user-from-token.decorator';
import { UserJWT } from 'src/common/users/users.dto';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto, UpdateCollectionDto } from './collections.dto';
import { Auth } from '../auth/auth.decorator';
import { CustomLoggerService } from 'src/config/custom-logger/custom-logger.service';

@ApiTags('collections')
@Controller('collections')
@Auth()
export class CollectionsController {
  constructor(
    private collectionsService: CollectionsService,
    private logger: CustomLoggerService,
  ) {}

  @Get()
  async collections(@UserFromToken() user: UserJWT) {
    return this.collectionsService.collections(user.id);
  }

  @Get(':id')
  async collection(@Param('id') id: string, @UserFromToken() user: UserJWT) {
    return this.collectionsService.collection(id, user);
  }

  @Post('create')
  async create(
    @Body() body: CreateCollectionDto,
    @UserFromToken() user: UserJWT,
  ) {
    this.logger.log('request-to-create-collection');
    const createdCollection = await this.collectionsService.create(body, user);
    this.logger.log('return-created-collection');
    return createdCollection;
  }

  @Patch(':id')
  async update(
    @Param('id') collectionId: string,
    @Body() collection: UpdateCollectionDto,
    @UserFromToken() user: UserJWT,
  ) {
    return this.collectionsService.update(collectionId, collection, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @UserFromToken() user: UserJWT) {
    await this.collectionsService.delete(id, user);

    return {
      status: 'deleted',
    };
  }
}
