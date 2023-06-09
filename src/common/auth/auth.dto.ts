import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  userLoginText: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
