import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CompleteStoryDto, CreateStoryDto, UpdateStoryDto } from './index.dto';
import { Story } from './index.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storiesRepository: Repository<Story>,
  ) {}

  async create({ name, roomId }: CreateStoryDto) {
    let id = uuidv4();
    let isExisted = await this.storiesRepository.findOneBy({ id });
    while (isExisted) {
      id = uuidv4();
      isExisted = await this.storiesRepository.findOneBy({ id });
    }
    const story = new Story();
    story.id = id;
    story.name = name;
    story.roomId = roomId;
    story.avgPoint = null;
    return this.storiesRepository.save(story);
  }

  async update({ id, name }: UpdateStoryDto): Promise<Story> {
    const story = await this.storiesRepository.findOneBy({ id });
    story.name = name || story.name;
    return this.storiesRepository.save(story);
  }

  async complete({ id }: CompleteStoryDto): Promise<Story> {
    const story = await this.storiesRepository.findOne({ where: { id }, relations: { userStories: true } });
    const numVotedUser = story.userStories.filter((userStory) => userStory.votePoint !== null).length;
    if (numVotedUser == 0) throw new Error('No user has voted yet');
    story.avgPoint = story.userStories.reduce((previousValue, currentValue) => previousValue + currentValue.votePoint, 0) / story.userStories.length;
    return this.storiesRepository.save(story);
  }

  async findAll(): Promise<Story[]> {
    return this.storiesRepository.find();
  }

  findOne(id: string): Promise<Story> {
    return this.storiesRepository.findOneBy({ id });
  }
}
