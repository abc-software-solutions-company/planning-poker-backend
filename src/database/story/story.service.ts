import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStoryRoom } from '../user-story-room/user-story-room.entity';
import { UserStoryRoomsService } from '../user-story-room/user-story-room.service';
import { CreateStoryDto, UpdateStoryDto } from './story.dto';
import { Story } from './story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storiesRepository: Repository<Story>,
  ) {}

  create(createStoryDto: CreateStoryDto): Promise<Story> {
    const story = new Story();
    story.name = createStoryDto.name;

    return this.storiesRepository.save(story);
  }

  async update(updateStoryDto: UpdateStoryDto): Promise<Story> {
    const { id, name, avgPoint } = updateStoryDto;
    const story = await this.storiesRepository.findOneBy({ id });
    story.name = name || story.name;
    story.avgPoint = avgPoint === undefined ? story.avgPoint : avgPoint;
    return this.storiesRepository.save(story);
  }

  async finish(id: string): Promise<Story> {
    const story = await this.storiesRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.usrs', 'usrs')
      .where('story.id=:id', { id })
      .orderBy('story.createdAt', 'DESC')
      .getOne();
    story.avgPoint = story.usrs.reduce((previousValue, currentValue) => previousValue + currentValue.storyPoint, 0);
    return this.storiesRepository.save(story);
  }

  async findAll(): Promise<Story[]> {
    return this.storiesRepository.find();
  }

  findOne(id: string): Promise<Story> {
    return this.storiesRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.storiesRepository.delete(id);
  }
}
