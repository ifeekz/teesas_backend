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
  phoneNumber: string;

  @IsNotEmpty()
  countryCode: string;

  @IsNotEmpty()
  grade: string;

  createdAt?: Date;
}
