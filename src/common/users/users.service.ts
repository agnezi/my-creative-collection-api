import type { Prisma, User } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaDbconfigService } from '../../config/prisma-dbconfig/prisma-dbconfig.service';
import { UpdateUserDto } from './users.dto';
import { CustomLoggerService } from 'src/config/custom-logger/custom-logger.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaDbconfigService,
    private logger: CustomLoggerService,
  ) {}

  public async findOneAuth(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  public async updateRefreshToken(userId: string, refreshToken: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
      select: {
        refreshToken: true,
      },
    });
  }

  public async update(userId: string, body: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: body,
      select: {
        id: true,
        name: true,
      },
    });

    this.logger.log('updated-user', userId);
    return updatedUser;
  }

  public async delete(where: Prisma.UserWhereUniqueInput) {
    const deletedUser = await this.prisma.user.delete({
      where,
      select: { id: true },
    });

    this.logger.log('deleted-user', where.id);

    return deletedUser;
  }
}
