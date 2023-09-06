import { Injectable } from '@nestjs/common';

import { PrismaDbconfigService } from 'src/config/prisma-dbconfig/prisma-dbconfig.service';
import { UsersService } from '../users/users.service';
import { CollectionsService } from '../collections/collections.service';
import { CreateThingDto, UpdateThingDto } from './things.dto';
import { CustomLoggerService } from 'src/config/custom-logger/custom-logger.service';
import { UserJWT } from '../users/users.dto';

@Injectable()
export class ThingsService {
  constructor(
    private prisma: PrismaDbconfigService,
    private logger: CustomLoggerService,
    private usersService: UsersService,
    private collectionsService: CollectionsService,
  ) {}

  public async create(data: CreateThingDto) {
    this.logger.log('creating-thing', data);
    const collection = await this.prisma.collection.findFirstOrThrow({
      where: { id: data.collectionId },
    });

    this.logger.log('collection-founded');

    const newThing = await this.prisma.thing.create({
      data: {
        collectionId: data.collectionId,
        title: data.title,
        description: data.description,
        edition: data.edition,
        volume: data.volume,
        status: data.status,
      },
    });

    this.logger.log('thing-created');
    return newThing;
  }

  public async things(collectionId?: string) {
    this.logger.log('get-things');
    const allThings = this.prisma.thing.findMany({
      where: {
        collectionId,
      },
    });

    this.logger.log('all-things-founded');

    return allThings;
  }

  public async update(thingId: string, data: UpdateThingDto) {
    return this.prisma.thing.update({
      where: {
        id: thingId,
      },
      data: {
        ...data,
      },
    });
  }

  public async delete(thingId: string, user: UserJWT) {
    await this.prisma.thing.findFirstOrThrow({
      where: {
        id: thingId,
        collection: {
          userId: user.id,
        },
      },
    });

    this.logger.log(`delete-thing-${thingId}`);

    await this.prisma.thing.delete({ where: { id: thingId } });
  }
}
