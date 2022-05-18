import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService: findOne', () => {
  let usersService: UsersService;
  let findOne: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne,
          },
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.findOne({
          email: 'test@test.com',
        });
        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          usersService.findOne({ email: 'test@test.com' }),
        ).rejects.toThrow();
      });
    });
  });

  // it.each`
  //   email                          | returnVal
  //   ${'anthony.maxwell@gmail.com'} | ${{ childName: 'Anthony Maxwell', email: 'anthony.maxwell@gmail.com' }}
  // `(
  //   'should call findOne for $name and return $returnVal',
  //   async ({ email, returnVal }: { email: string; returnVal: User }) => {
  //     expect(await usersService.findOne({ email })).toEqual(returnVal);
  //   },
  // );
});
