import type { Prisma, User } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaDbconfigService } from '../../config/prisma-dbconfig/prisma-dbconfig.service';
import { UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaDbconfigService) {}

  async findOneAuth(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async update(userId: string, body: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: body,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
