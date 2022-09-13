import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoomDto, UpdateUserRoomDto } from './index.dto';
import { UserRoom } from './index.entity';

@Injectable()
export class UserRoomsService {
  constructor(
    @InjectRepository(UserRoom)
    private readonly userRoomsRepository: Repository<UserRoom>,
  ) {}

  create(createUserRoomDto: CreateUserRoomDto): Promise<UserRoom> {
    const userRoom = new UserRoom();
    const { userId, roomId } = createUserRoomDto;
    userRoom.userId = userId;
    userRoom.roomId = roomId;
    userRoom.isOnline = true;
    return this.userRoomsRepository.save(userRoom);
  }

  async update(updateUserRoomDto: UpdateUserRoomDto): Promise<UserRoom> {
    const { userId, roomId, isOnline } = updateUserRoomDto;
    const userRoom = await this.userRoomsRepository.findOneBy({ userId, roomId });
    userRoom.isOnline = isOnline || userRoom.isOnline;
    return this.userRoomsRepository.save(userRoom);
  }

  async findAll(): Promise<UserRoom[]> {
    return this.userRoomsRepository.find();
  }

  findOne(userId: string, roomId: string): Promise<UserRoom> {
    return this.userRoomsRepository.findOneBy({ userId, roomId });
  }

  async remove(userId: string, roomId: string): Promise<void> {
    await this.userRoomsRepository.delete({ userId, roomId });
  }
}
