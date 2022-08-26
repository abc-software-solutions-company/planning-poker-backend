import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserStoryRoomDto, UpdateUserStoryRoomDto } from './user-story-rooms.dto';
import { UserStoryRoom } from './user-story-rooms.entity';

@Injectable()
export class UserStoryRoomsService {
  constructor(
    @InjectRepository(UserStoryRoom)
    private readonly usrsRepository: Repository<UserStoryRoom>,
  ) {}

  create(createUserStoryRoomDto: CreateUserStoryRoomDto): Promise<UserStoryRoom> {
    const usr = new UserStoryRoom();
    usr.user_id = createUserStoryRoomDto.userId;
    usr.story_id = createUserStoryRoomDto.storyId;
    usr.room_id = createUserStoryRoomDto.roomId;
    usr.is_online = createUserStoryRoomDto.isOnline || true;
    usr.is_host = createUserStoryRoomDto.isHost || false;

    return this.usrsRepository.save(usr);
  }

  async update(updateUserStoryRoomDto: UpdateUserStoryRoomDto): Promise<UserStoryRoom> {
    const { userId: user_id, storyId: story_id, roomId: room_id, isOnline: is_online, storyPoint: story_point, isHost: is_host } = updateUserStoryRoomDto;
    const usr = await this.usrsRepository.findOneBy({ user_id, story_id, room_id });
    usr.is_online = is_online || usr.is_online;
    usr.is_host = is_host || usr.is_host;
    usr.story_point = story_point || usr.story_point;
    return this.usrsRepository.save(usr);
  }

  async findAll(): Promise<UserStoryRoom[]> {
    return this.usrsRepository.find();
  }

  findOne(user_id: string, story_id: string, room_id: number): Promise<UserStoryRoom> {
    return this.usrsRepository.findOneBy({ user_id, story_id, room_id });
  }

  async remove(user_id: string, story_id: string, room_id: number): Promise<void> {
    await this.usrsRepository.delete({ user_id, story_id, room_id });
  }
}
