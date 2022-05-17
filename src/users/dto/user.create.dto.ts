import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Match } from '../match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  childName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Match('password')
  confirmPassword: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  countryCode: string;

  @IsNotEmpty()
  grade: string;
}
