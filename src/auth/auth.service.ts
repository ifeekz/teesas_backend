import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/user.login.dto';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { UsersService } from '../users/users.service';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const payload = { username: user.email, sub: user.password };
    const token = this.jwtTokenService.sign(payload);

    return {
      status: true,
      message: 'Login successfully',
      token: token,
    };
  }

  async signup(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      status: true,
      message: 'Learner created successfully',
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        status: false,
        message: err,
      };
    }

    return status;
  }
}
