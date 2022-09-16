import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './index.entity';

interface ICreate {
  name: string;
}
interface IUpdate extends ICreate {
  id: string;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create({ name }: ICreate): Promise<User> {
    const user = new User();
    user.name = name;
    return this.usersRepository.save(user);
  }

  async update({ id, name }: IUpdate): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    user.name = name || user.name;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    if (!id) return null;
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
