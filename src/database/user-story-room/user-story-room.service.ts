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
    const { userId, storyId, roomId } = createUserStoryRoomDto;
    usr.userId = userId;
    usr.storyId = storyId;
    usr.roomId = roomId;
    usr.isOnline = true;

    return this.usrsRepository.save(usr);
  }

  async update(updateUserStoryRoomDto: UpdateUserStoryRoomDto): Promise<UserStoryRoom> {
    const { userId, storyId, roomId, isOnline, storyPoint } = updateUserStoryRoomDto;
    console.log('🚀 ~ file: user-story-room.service.ts ~ line 27 ~ UserStoryRoomsService ~ update ~ updateUserStoryRoomDto', updateUserStoryRoomDto);
    const usr = await this.usrsRepository.findOneBy({ userId, storyId, roomId });
    usr.isOnline = isOnline || usr.isOnline;
    usr.storyPoint = storyPoint === undefined ? usr.storyPoint : storyPoint;
    return this.usrsRepository.save(usr);
  }

  async findAll(): Promise<UserStoryRoom[]> {
    return this.usrsRepository.find();
  }
  findAllbyRoom(roomId: number): Promise<UserStoryRoom[]> {
    // return this.usrsRepository.findBy({ roomId: Number(roomId) });
    return this.usrsRepository
      .createQueryBuilder('usr')
      .leftJoinAndSelect('usr.story', 'story')
      .leftJoinAndSelect('usr.room', 'room')
      .leftJoinAndSelect('usr.user', 'user')
      .where('usr.roomId=:roomId', { roomId })
      .orderBy('usr.createdAt', 'DESC')
      .getMany();
  }

  // findOne(userId: string, roomId: number): Promise<UserStoryRoom> {
  //   return this.usrsRepository.findOneBy({ userId, roomId: Number(roomId) });
  // }

  findFullOne(roomId: number): Promise<UserStoryRoom> {
    return this.usrsRepository
      .createQueryBuilder('usr')
      .leftJoinAndSelect('usr.story', 'story')
      .leftJoinAndSelect('usr.room', 'room')
      .where('usr.roomId=:roomId', { roomId })
      .orderBy('usr.createdAt', 'DESC')
      .getOne();
  }

  async remove(userId: string, storyId: string, roomId: number): Promise<void> {
    await this.usrsRepository.delete({ userId, storyId, roomId });
  }
}
