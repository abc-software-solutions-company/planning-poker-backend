import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserStoryRoomDto } from './dto/create-user-story-room.dto';
import { UserStoryRoom } from './user-story-rooms.entity';

@Injectable()
export class UserStoryRoomsService {
  constructor(
    @InjectRepository(UserStoryRoom)
    private readonly userStoryRoomsRepository: Repository<UserStoryRoom>,
  ) {}

  // create(
  //   createUserStoryRoomDto: CreateUserStoryRoomDto,
  // ): Promise<UserStoryRoom> {
  //   const userUserStoryRoom = new UserStoryRoom();
  //   userUserStoryRoom.user_id = createUserStoryRoomDto.userId;
  //   userUserStoryRoom.story_id = createUserStoryRoomDto.storyId;
  //   userUserStoryRoom.room_id = createUserStoryRoomDto.roomId;
  //   userUserStoryRoom.is_online = createUserStoryRoomDto.isOnline;
  //   userUserStoryRoom.story_point = createUserStoryRoomDto.storyPoint;

  //   return this.userStoryRoomsRepository.save(userUserStoryRoom);
  // }

  // async findAll(): Promise<UserStoryRoom[]> {
  //   return this.userStoryRoomsRepository.find();
  // }

  // findOne(
  //   user_id: string,
  //   story_id: string,
  //   room_id: number,
  // ): Promise<UserStoryRoom> {
  //   return this.userStoryRoomsRepository.findOneBy({
  //     user_id,
  //     story_id,
  //     room_id,
  //   });
  // }

  // async remove(
  //   user_id: string,
  //   story_id: string,
  //   room_id: number,
  // ): Promise<void> {
  //   await this.userStoryRoomsRepository.delete({
  //     user_id,
  //     story_id,
  //     room_id,
  //   });
  // }
}
