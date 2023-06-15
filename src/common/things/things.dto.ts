import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateThingDto implements Prisma.ThingCreateInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  collectionId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  volume?: number;

  @IsString()
  @IsOptional()
  edition?: string;
}

export class UpdateThingDto implements Prisma.ThingUpdateInput {
  @IsNumber()
  @IsOptional()
  volume?: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  edition?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
