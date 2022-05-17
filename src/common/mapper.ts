import { User } from '../users/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { LessonDto } from 'src/lessons/dto/Lesson.dto';
import { Lesson } from 'src/lessons/lesson.entity';

export const toUserDto = (data: User): UserDto => {
  const { id, childName, email, phoneNumber, countryCode, grade } = data;

  let userDto: UserDto = {
    id,
    childName,
    email,
    phoneNumber,
    countryCode,
    grade,
  };

  return userDto;
};

export const toLessonDto = (data: Lesson): LessonDto => {
  const { id, name, startDate, duration } = data;

  let lessonDto: LessonDto = {
    id,
    name,
    startDate,
    duration,
  };

  return lessonDto;
};
