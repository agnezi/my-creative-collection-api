import { Injectable } from '@nestjs/common';

import { PrismaDbconfigService } from 'src/config/prisma-dbconfig/prisma-dbconfig.service';
import { UsersService } from '../users/users.service';
import { CollectionsService } from '../collections/collections.service';
import { CreateThingDto, UpdateThingDto } from './things.dto';

@Injectable()
export class ThingsService {
  constructor(
    private prisma: PrismaDbconfigService,
    private usersService: UsersService,
    private collectionsService: CollectionsService,
  ) {}

  async create(data: CreateThingDto) {
    return await this.prisma.thing.create({
      data: {
        collectionId: data.collectionId,
        title: data.title,
        description: data.description,
        edition: data.edition,
        volume: data.volume,
      },
    });
  }

  async things(collectionId?: string) {
    return this.prisma.thing.findMany({
      where: {
        collectionId,
      },
    });
  }

  async update(thingId: string, data: UpdateThingDto) {
    return this.prisma.thing.update({
      where: {
        id: thingId,
      },
      data: {
        ...data,
      },
    });
  }
}
