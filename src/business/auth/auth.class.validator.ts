import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class SignUpValidatorSchema {
  @Length(3, 50)
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(5, 12)
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;
}
