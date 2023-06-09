import type { Prisma, User } from '@prisma/client';

import { BcryptConfigService } from '@app/bcrypt-config';
import { Injectable } from '@nestjs/common';
import { PrismaDbconfigService } from '../../config/prisma-dbconfig/prisma-dbconfig.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaDbconfigService,
    private bcryptConfigService: BcryptConfigService,
  ) {}

  async findOneAuth(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findOne(user: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    const hash = this.bcryptConfigService.hashPassword(data.password);
    const newUser = { ...data, password: hash };
    return this.prisma.user.create({
      data: newUser,
      select: {
        name: true,
        username: true,
        id: true,
        createdAt: true,
        email: true,
      },
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
