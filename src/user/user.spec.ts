import { TestingModule } from '@nestjs/testing';
import { testHelper } from 'src/utils/testHelper';
import { UsersService } from './user.service';

describe('UssersService', () => {
  let usersService: UsersService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await testHelper();
    usersService = moduleRef.get<UsersService>(UsersService);
  });
  afterEach(async () => {
    await moduleRef.close();
  });
  describe('create()', () => {
    it('Shound return the name Huy and id 36 letters', async () => {
      const u = await usersService.create({ name: 'Huy' });
      expect(u.id.length).toEqual(36);
      expect(u.name).toEqual('Huy');
    });
  });
});
