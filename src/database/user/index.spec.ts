import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './index.entity';
import { UsersService } from './index.service';

const user1 = {
  id: '9057dc50-8aaa-4cd2-975a-4af1c267d001',
  name: 'user1',
};
const user2 = {
  id: '9057dc50-8aaa-4cd2-975a-4af1c267d002',
  name: 'user2',
};

const userArray = [user1, user2];

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(user1),
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(user1),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      expect(
        service.create({
          name: 'user1',
        }),
      ).resolves.toBeDefined();
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('9057dc50-8aaa-4cd2-975a-4af1c267d001')).resolves.toEqual(user1);
      expect(repoSpy).toBeCalledWith({ id: '9057dc50-8aaa-4cd2-975a-4af1c267d001' });
    });
  });
});
