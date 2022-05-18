import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';
import mockedConfigService from '../utils/mocks/config.service';
import mockedJwtService from '../utils/mocks/jwt.service';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
dotenv.config();

describe('AuthService', () => {
  let authService: AuthService;

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
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('when signing up', () => {
    describe('and the user payload is correct', () => {
      let authService: AuthService;
      let status: RegistrationStatus = {
        status: true,
        message: 'Learner created successfully',
      };

      beforeEach(async () => {});

      it('should return the user data', async () => {
        const res = await authService.signup({
          childName: 'Anthony Maxwell',
          email: 'anthony.maxwell@gmail.com',
          phoneNumber: '08060606060',
          countryCode: '234',
          grade: 'Grade 2',
          password: '123456',
          confirmPassword: '123456',
        });
      });
    });
  });
});

// describe('validateUser', () => {
//   let authService: AuthService;

//   beforeEach(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [
//         PassportModule,
//         JwtModule.register({
//           secret: process.env.JWT_SECRET,
//           signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
//         }),
//       ],
//       providers: [
//         UsersService,
//         AuthService,
//         {
//           provide: ConfigService,
//           useValue: mockedConfigService,
//         },
//         {
//           provide: JwtService,
//           useValue: mockedJwtService,
//         },
//         {
//           provide: getRepositoryToken(User),
//           useValue: {},
//         },
//       ],
//     }).compile();

//     authService = moduleRef.get<AuthService>(AuthService);
//   });

//   it('should return a user object when credentials are valid', async () => {
//     const res = await authService.validateUserCredentials({
//       email: 'anthony.maxwell@gmail.com',
//     });
//     expect(res.email).toEqual('anthony.maxwell@gmail.com');
//   });

//   it('should return user not found when user email does not exist', async () => {
//     const res = await authService.validateUserCredentials({
//       email: 'test@gmail.com',
//     });
//     expect(res).toContain({
//       statusCode: 401,
//       message: 'User not found',
//     });
//   });
// });

// describe('validateLogin', () => {
//   let authService: AuthService;

//   beforeEach(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [
//         PassportModule,
//         JwtModule.register({
//           secret: process.env.JWT_SECRET,
//           signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
//         }),
//       ],
//       providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
//     }).compile();

//     authService = moduleRef.get<AuthService>(AuthService);
//   });

//   it('should return response with JWT object when credentials are valid', async () => {
//     const res = await authService.login({
//       email: 'anthony.maxwell@gmail.com',
//       password: '123456',
//     });

//     expect(res?.status).toBe(true);
//     expect(res.message).toEqual('Login successful');
//     expect(res.token).toBeDefined();
//   });
// });
