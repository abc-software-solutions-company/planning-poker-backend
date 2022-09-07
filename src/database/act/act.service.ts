import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActDto, UpdateActDto } from './act.dto';
import { Act } from './act.entity';

@Injectable()
export class ActsService {
  constructor(
    @InjectRepository(Act)
    private readonly actsRepository: Repository<Act>,
  ) {}

  create(createActDto: CreateActDto): Promise<Act> {
    const act = new Act();
    const { userId, roomId } = createActDto;
    act.userId = userId;
    act.roomId = roomId;
    act.isOnline = true;
    return this.actsRepository.save(act);
  }

  async update(updateActDto: UpdateActDto): Promise<Act> {
    const { userId, roomId, isOnline } = updateActDto;
    const act = await this.actsRepository.findOneBy({ userId, roomId });
    act.isOnline = isOnline || act.isOnline;
    return this.actsRepository.save(act);
  }

  async findAll(): Promise<Act[]> {
    return this.actsRepository.find();
  }
  findAllbyRoom(roomId: number): Promise<Act[]> {
    // return this.actsRepository.findBy({ roomId: Number(roomId) });
    return this.actsRepository
      .createQueryBuilder('act')
      .leftJoinAndSelect('act.room', 'room')
      .leftJoinAndSelect('act.user', 'user')
      .where('act.roomId=:roomId', { roomId })
      .orderBy('act.createdAt', 'DESC')
      .getMany();
  }

  findFullOne(roomId: number): Promise<Act> {
    return this.actsRepository
      .createQueryBuilder('act')
      .leftJoinAndSelect('act.story', 'story')
      .leftJoinAndSelect('act.room', 'room')
      .leftJoinAndSelect('act.results', 'results')
      .where('act.roomId=:roomId', { roomId })
      .orderBy('act.createdAt', 'DESC')
      .getOne();
  }

  findOne(userId: string, roomId: number): Promise<Act> {
    return this.actsRepository.findOneBy({ userId, roomId: Number(roomId) });
  }

  async remove(userId: string, roomId: number): Promise<void> {
    await this.actsRepository.delete({ userId, roomId });
  }
}
