import { Injectable } from '@nestjs/common';
import { PrismaDbconfigService } from 'src/config/prisma-dbconfig/prisma-dbconfig.service';
import { UserJWT } from 'src/common/users/users.dto';
import { Prisma } from '@prisma/client';
import { CustomLoggerService } from 'src/config/custom-logger/custom-logger.service';

@Injectable()
export class CollectionsService {
  constructor(
    private prisma: PrismaDbconfigService,
    private logger: CustomLoggerService,
  ) {}

  public async create(data: Prisma.CollectionCreateInput, user: UserJWT) {
    this.logger.log('creating-collection');
    const createdCollection = await this.prisma.collection.create({
      data: {
        title: data.title,
        userId: user.id,
        description: data?.description,
      },
    });

    this.logger.log('created-collection');
    return createdCollection;
  }

  public async collections(userId: string) {
    const foundCollections = await this.prisma.collection.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        things: true,
        title: true,
        description: true,
      },
    });

    this.logger.log('get-all-collections');

    return foundCollections;
  }

  public async collection(collectionId: string, user: UserJWT) {
    const foundCollection = await this.prisma.collection.findFirstOrThrow({
      where: {
        id: collectionId,
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    this.logger.log('found-collection', collectionId);

    return foundCollection;
  }

  public async update(
    collectionId: string,
    collection: Prisma.CollectionUpdateInput,
    user: UserJWT,
  ) {
    await this.prisma.collection.findFirstOrThrow({
      where: {
        id: collectionId,
        userId: user.id,
      },
    });

    const updated = await this.prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        ...collection,
      },
    });

    this.logger.log('updated-collection', collectionId);

    return updated;
  }

  public async delete(id: string, user: UserJWT) {
    await this.prisma.collection.findFirstOrThrow({
      where: {
        id: id,
        userId: user.id,
      },
    });

    await this.prisma.collection.delete({
      where: {
        id,
      },
    });
    this.logger.log('delete-for-collection', id);
  }
}
