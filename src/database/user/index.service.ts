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
    return this.usersRepository.findOneBy({ id });
  }

  async findUSR({ roomId, storyId }) {
    const usr = [];
    const ur = await this.usersRepository.find({
      where: { userRooms: { roomId } },
      relations: { userRooms: true },
    });
    if (storyId)
      usr.push(
        ...(await this.usersRepository.find({
          where: { userRooms: { roomId }, userStories: { storyId } },
          relations: { userRooms: true, userStories: true },
        })),
      );
    const data = ur.map(({ id, name, userRooms: [{ isOnline }] }) => {
      const votePoint = usr.filter((item) => item.id === id)[0]?.userStories?.[0].votePoint;
      return { id, name, isOnline, votePoint };
    });
    return data;
  }
}
