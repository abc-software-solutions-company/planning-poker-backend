import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserStoryRoomDto, UpdateUserStoryRoomDto } from './user-story-room.dto';
import { UserStoryRoom } from './user-story-room.entity';

@Injectable()
export class UserStoryRoomsService {
  constructor(
    @InjectRepository(UserStoryRoom)
    private readonly usrsRepository: Repository<UserStoryRoom>,
  ) {}

  create(createUserStoryRoomDto: CreateUserStoryRoomDto): Promise<UserStoryRoom> {
    const usr = new UserStoryRoom();
    const { userId, storyId, roomId, isOnline } = createUserStoryRoomDto;
    usr.userId = userId;
    usr.storyId = storyId;
    usr.roomId = roomId;
    usr.isOnline = isOnline || true;

    return this.usrsRepository.save(usr);
  }

  async update(updateUserStoryRoomDto: UpdateUserStoryRoomDto): Promise<UserStoryRoom> {
    const { userId, storyId, roomId, isOnline, storyPoint } = updateUserStoryRoomDto;
    const usr = await this.usrsRepository.findOneBy({ userId, storyId, roomId });
    usr.isOnline = isOnline || usr.isOnline;
    usr.storyPoint = storyPoint || usr.storyPoint;
    return this.usrsRepository.save(usr);
  }

  async findAll(): Promise<UserStoryRoom[]> {
    return this.usrsRepository.find();
  }

  findOne(userId: string, storyId: string, roomId: number): Promise<UserStoryRoom> {
    return this.usrsRepository.findOneBy({ userId, storyId, roomId });
  }

  async remove(userId: string, storyId: string, roomId: number): Promise<void> {
    await this.usrsRepository.delete({ userId, storyId, roomId });
  }
}
