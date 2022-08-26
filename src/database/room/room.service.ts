import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  create(createRoomDto: CreateRoomDto): Promise<Room> {
    const { name, hostUserId } = createRoomDto;
    const room = new Room();
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

  findOne(id: number): Promise<Room> {
    return this.roomsRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.roomsRepository.delete(id);
  }
}
