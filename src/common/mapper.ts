import { User } from '../users/user.entity';
import { UserDto } from '../users/dto/user.dto';

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
