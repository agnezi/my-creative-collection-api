import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { UserFromToken } from 'src/common/auth/user-from-token.decorator';
import { UserJWT } from 'src/common/users/users.dto';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto, UpdateCollectionDto } from './collections.dto';

@ApiTags('collections')
@Controller('collections')
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
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Get()
  async collections(@UserFromToken() user: UserJWT) {
    return this.collectionsService.collections(user.id);
  }

  @Get(':id')
  async collection(@Param('id') id: string) {
    return this.collectionsService.collection(id);
  }

  @Post('create')
  async create(
    @Body() body: CreateCollectionDto,
    @UserFromToken() user: UserJWT,
  ) {
    return this.collectionsService.create(body, user);
  }

  @Patch(':id')
  async update(
    @Param('id') collectionId: string,
    @Body() collection: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(collectionId, collection);
  }
}
