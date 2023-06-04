import { Injectable, Patch } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaDbconfigService } from 'src/config/prisma-dbconfig/prisma-dbconfig.service';
import { UserJWT } from 'src/users/users.dto';
import { UpdateCollectionDto } from './collections.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaDbconfigService) {}

  async create(data: Prisma.CollectionCreateInput, user: UserJWT) {
    return this.prisma.collection.create({
      data: {
        title: data.title,
        userId: user.id,
        description: data?.description,
      },
    });
  }

  async collections(userId: string) {
    return this.prisma.collection.findMany({
      where: {
        userId,
      },
    });
  }

  async collection(collectionId: number) {
    typeof collectionId;
    return this.prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
  }

  async update(collectionId: number, collection: Prisma.CollectionUpdateInput) {
    return this.prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        ...collection,
      },
    });
  }
}
