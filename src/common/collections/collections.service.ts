import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaDbconfigService } from 'src/config/prisma-dbconfig/prisma-dbconfig.service';
import { UserJWT } from 'src/common/users/users.dto';

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
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }

  async collection(collectionId: string) {
    typeof collectionId;
    return this.prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }

  async update(collectionId: string, collection: Prisma.CollectionUpdateInput) {
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
