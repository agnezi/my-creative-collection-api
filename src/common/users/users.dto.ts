import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Prisma } from '@prisma/client';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  username?: string;
}

export class UserJWT implements Prisma.UserWhereUniqueInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
