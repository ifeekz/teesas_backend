import { Lesson } from '../lesson.entity';

export interface GetLessonsStatus {
  status: boolean;
  message: string;
  data: any;
}
