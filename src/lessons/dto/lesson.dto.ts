import { IsNotEmpty, IsEmail } from 'class-validator';

export class LessonDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  duration: number;
}
