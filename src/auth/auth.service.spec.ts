import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigModule } from '@nestjs/config';

import * as dotenv from 'dotenv';
dotenv.config();

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
        }),
      ],
      providers: [
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('validateSignup', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return JWT object when credentials are valid', async () => {
    const res = await service.signup({
      childName: 'Anthony Maxwell',
      email: 'anthony.maxwell@gmail.com',
      phoneNumber: '08060606060',
      countryCode: '234',
      grade: 'Grade 2',
      password: '123456',
      confirmPassword: '123456',
    });

    expect(res.status).toEqual(true);
    expect(res.message).toEqual('learner created successfully');
  });
});

describe('validateUser', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return a user object when credentials are valid', async () => {
    const res = await service.validateUserCredentials({
      email: 'anthony.maxwell@gmail.com',
    });
    expect(res.email).toEqual('anthony.maxwell@gmail.com');
  });

  it('should return user not found when user email does not exist', async () => {
    const res = await service.validateUserCredentials({
      email: 'test@gmail.com',
    });
    expect(res).toContain({
      statusCode: 401,
      message: 'User not found',
    });
  });
});

describe('validateLogin', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return response with JWT object when credentials are valid', async () => {
    const res = await service.login({
      email: 'anthony.maxwell@gmail.com',
      password: '123456',
    });

    expect(res?.status).toBe(true);
    expect(res.message).toEqual('Login successful');
    expect(res.token).toBeDefined();
  });
});
