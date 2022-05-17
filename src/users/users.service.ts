import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { comparePasswords } from '../common/utils';
import { toUserDto } from '../common/mapper';
import { CreateUserDto } from './dto/user.create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.findOne({ where: { email } });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { childName, email, password, phoneNumber, countryCode, grade } =
      userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const user: User = this.userRepo.create({
        childName,
        email,
        password,
        phoneNumber,
        countryCode,
        grade,
      });

      await this.userRepo.save(user);

      return toUserDto(user);
    } catch (error) {
      throw new HttpException(
        `Something went wrong: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
