import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CompleteStoryDto, CreateStoryDto, UpdateStoryDto } from './story.dto';
import { Story } from './story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storiesRepository: Repository<Story>,
  ) {}

  async create(createStoryDto: CreateStoryDto): Promise<Story | number> {
    const { name, roomId } = createStoryDto;
    const roomStories = await this.storiesRepository.find({ where: { roomId, avgPoint: IsNull() } });
    if (roomStories.length > 0) {
      return 405;
    }
    const story = new Story();
    story.name = name;
    story.roomId = roomId;
    story.avgPoint = null;
    return this.storiesRepository.save(story);
  }

  async update(updateStoryDto: UpdateStoryDto): Promise<Story> {
    const { id, name, avgPoint } = updateStoryDto;
    const story = await this.storiesRepository.findOneBy({ id });
    story.name = name || story.name;
    story.avgPoint = avgPoint === undefined ? story.avgPoint : avgPoint;
    return this.storiesRepository.save(story);
  }

  async complete(completeStoryDto: CompleteStoryDto): Promise<Story> {
    const story = await this.storiesRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.results', 'results')
      .where('story.id=:id', { id: completeStoryDto.id })
      .getOne();
    const lenVoted = story.results.filter((result) => result.votePoint !== null).length;
    if (lenVoted == 0) throw new Error('No user has voted yet');
    story.avgPoint = story.results.reduce((previousValue, currentValue) => previousValue + currentValue.votePoint, 0) / story.results.length;
    return this.storiesRepository.save(story);
  }

  // async findAll(): Promise<Story[]> {
  //   return this.storiesRepository.find();
  // }

  // findOne(id: string): Promise<Story> {
  //   return this.storiesRepository.findOneBy({ id: id });
  // }

  // async remove(id: string): Promise<void> {
  //   await this.storiesRepository.delete(id);
  // }
}
