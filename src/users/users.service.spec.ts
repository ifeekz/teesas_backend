import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService: findOne', () => {
  let service: UsersService;
  let findOne: jest.Mock;

  beforeEach(async () => {
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

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each`
    email                          | returnVal
    ${'anthony.maxwell@gmail.com'} | ${{ id: 1, childName: 'Anthony Maxwell', email: 'anthony.maxwell@gmail.com' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ email, returnVal }: { email: string; returnVal: User }) => {
      expect(await service.findOne({ email })).toEqual(returnVal);
    },
  );
});
