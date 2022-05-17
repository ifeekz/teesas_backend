import { IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  duration: number;
}
