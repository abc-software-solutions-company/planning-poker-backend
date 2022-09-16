import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoolsService } from '../pool/index.service';
import { Room } from './index.entity';

interface ICreate {
  name: string;
  hostUserId: string;
}
interface IUpdate {
  id: string;
  name?: string;
  hostUserId?: string;
}

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    private readonly poolsService: PoolsService,
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

  async update({ id, name, hostUserId }: IUpdate) {
    const room = await this.roomsRepository.findOneBy({ id });
    if (room || room.id !== id) throw new BadRequestException('Room not exist');
    room.name = name || room.name;
    room.hostUserId = hostUserId || room.hostUserId;
    return this.roomsRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  findOne(id: string): Promise<Room> {
    return this.roomsRepository.findOneBy({ id: id });
  }

  findFullOne(id: string): Promise<Room> {
    const room = this.roomsRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.userRooms', 'userRooms')
      .leftJoinAndSelect('room.stories', 'stories')
      .leftJoinAndSelect('stories.userStories', 'userStories')
      .leftJoinAndSelect('userRooms.user', 'user')
      .leftJoinAndSelect('user.userStories', 'userStories2')
      .where('room.id=:id', { id })
      .getOne();
    return room;
  }

  async remove(id: string): Promise<void> {
    await this.roomsRepository.delete(id);
  }
}
