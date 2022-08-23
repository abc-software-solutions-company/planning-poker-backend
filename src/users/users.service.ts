import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.is_host = createUserDto.isHost;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        created_at: 'desc',
      },
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
