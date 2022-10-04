import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoolsService } from '../pool/pool.service';
import { UsersService } from '../user/user.service';
import { Room } from './room.entity';

interface ICreate {
  name: string;
  hostUserId: string;
}

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    private readonly poolsService: PoolsService,
    private readonly usersService: UsersService,
  ) {}

  async create({ name, hostUserId }: ICreate) {
    const pool = await this.poolsService.getOne();
    const room = new Room();
    room.id = pool.id;
    room.name = name;
    room.hostUserId = hostUserId;
    const save = await this.roomsRepository.save(room);
    if (!save) throw new Error('Create failure room');
    this.poolsService.use(pool.id);
    return save;
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  findOne(id: string): Promise<Room> {
    return this.roomsRepository.findOneBy({ id: id });
  }

  async findFullOne(id: string) {
    const roomQuery = await this.roomsRepository.findOne({
      select: { stories: { id: true, name: true, avgPoint: true } },
      where: { id },
      relations: { stories: true },
    });
    const { stories, ...room } = roomQuery;
    const story = stories?.[stories.length - 1];
    const users = await this.usersService.findUSR({ roomId: id, storyId: story?.id });
    users.sort((user) => (user.id === room.hostUserId ? -1 : 1));
    const data = { ...room, story, users };
    return data;
  }
}
