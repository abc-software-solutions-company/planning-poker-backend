import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoom } from './index.entity';

interface ICreate {
  userId: string;
  roomId: string;
}
interface IUpdate extends ICreate {
  isOnline: boolean;
}
@Injectable()
export class UserRoomsService {
  constructor(
    @InjectRepository(UserRoom)
    private readonly userRoomsRepository: Repository<UserRoom>,
  ) {}

  async create({ userId, roomId }: ICreate): Promise<UserRoom> {
    const isExisted = await this.userRoomsRepository.findOneBy({ userId, roomId });
    if (isExisted) throw new MethodNotAllowedException();
    const userRoom = new UserRoom();
    userRoom.userId = userId;
    userRoom.roomId = roomId;
    userRoom.isOnline = true;
    return this.userRoomsRepository.save(userRoom);
  }

  async update({ userId, roomId, isOnline }: IUpdate): Promise<UserRoom> {
    const userRoom = await this.userRoomsRepository.findOneBy({ userId, roomId });
    if (!userRoom) throw new MethodNotAllowedException();
    userRoom.isOnline = isOnline;
    return this.userRoomsRepository.save(userRoom);
  }

  findAll(): Promise<UserRoom[]> {
    return this.userRoomsRepository.find();
  }

  findOne(userId: string, roomId: string): Promise<UserRoom> {
    return this.userRoomsRepository.findOneBy({ userId, roomId });
  }
}
