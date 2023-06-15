import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  @IsOptional()
  name?: string;
}

export class UserJWT implements Prisma.UserWhereUniqueInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
