import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  generateId() {
    const pool = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let index = 0; index < 5; index++) {
      const r = Math.floor(Math.random() * pool.length);
      id = id + pool[r];
    }
    return id;
  }

  async generateRoom(number) {
    const rooms = [];
    let i = 0;
    while (i < number) {
      const room = new Room();
      room.id = this.generateId();
      room.name = 'name';
      room.hostUserId = null;
      const save = await this.roomsRepository.save(room);
      if (save) {
        i = i + 1;
        rooms.push(save);
      }
    }
    return rooms;
  }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const { name, hostUserId } = createRoomDto;
    let room = await this.roomsRepository.findOneBy({ hostUserId: IsNull() });
    if (!room) {
      await this.generateRoom(10);
      room = await this.roomsRepository.findOneBy({ hostUserId: IsNull() });
    }
    console.log('🚀 ~ file: room.service.ts ~ line 47 ~ RoomsService ~ create ~ room', room);

    room.name = name;
    room.hostUserId = hostUserId;
    return this.roomsRepository.save(room);
  }

  async update(updateRoomDto: UpdateRoomDto): Promise<Room> {
    const { id, name, hostUserId } = updateRoomDto;
    const room = await this.roomsRepository.findOneBy({ id });
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
      .leftJoinAndSelect('room.acts', 'acts')
      .leftJoinAndSelect('room.stories', 'stories')
      .leftJoinAndSelect('stories.results', 'results')
      .leftJoinAndSelect('acts.user', 'user')
      .leftJoinAndSelect('user.results', 'results2')
      .where('room.id=:id', { id })
      // .orderBy('room.createdAt', 'DESC')
      .getOne();
    return room;
  }

  async remove(id: number): Promise<void> {
    await this.roomsRepository.delete(id);
  }
}
