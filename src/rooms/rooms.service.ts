import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = new Room();
    room.name = createRoomDto.name;

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
