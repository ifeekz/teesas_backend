import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  childName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  password?: string;

  @IsNotEmpty()
  phoneNumber: number;

  @IsNotEmpty()
  countryCode: number;

  @IsNotEmpty()
  grade: string;

  createdAt?: Date;
}
