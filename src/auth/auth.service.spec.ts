import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import * as sinon from 'sinon';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mockedConfigService from '../utils/mocks/config.service';
import mockedJwtService from '../utils/mocks/jwt.service';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { CreateUserDto } from '../users/dto/user.create.dto';

import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
dotenv.config();

describe('AuthService', () => {
  let authService: AuthService;
  let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    sandbox = sinon.createSandbox();
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
          useValue: sinon.createStubInstance(Repository),
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
      it('should call signup method with expected params', async () => {
        const createAuthSpy = jest.spyOn(authService, 'signup');
        const dto = new CreateUserDto();
        authService.signup(dto);
        expect(createAuthSpy).toHaveBeenCalledWith(dto);
      });

      // it('should return the RegistrationStatus', async () => {
      //   let status: RegistrationStatus = {
      //     status: true,
      //     message: 'Learner created successfully',
      //   };
      //   const dto = new CreateUserDto();
      //   const returnValue = await authService.signup(dto);
      //   expect(returnValue).toEqual(status);
      // });
    });
  });

  // describe('validateUser', () => {
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

  afterAll(async () => {
    sandbox.restore();
  });
});

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
