import type { Prisma, User } from '@prisma/client';

import { BcryptConfigService } from '@app/bcrypt-config';
import { Injectable } from '@nestjs/common';
import { PrismaDbconfigService } from '../../config/prisma-dbconfig/prisma-dbconfig.service';
import { UpdateUserDto } from './users.dto';

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

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
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
