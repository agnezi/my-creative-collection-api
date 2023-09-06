import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Prisma } from '@prisma/client';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  newPassword?: string;

  @IsString()
  @IsOptional()
  confirmNewPassword?: string;
}

export class UserJWT implements Prisma.UserWhereUniqueInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UserTokensDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @IsString()
  @IsNotEmpty()
  user_data_token: string;
}
