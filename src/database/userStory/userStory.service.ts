import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStory } from './userStory.entity';

interface ICreate {
  userId: string;
  storyId: string;
}

interface IUpdate extends ICreate {
  votePoint: number;
}
@Injectable()
export class UserStoriesService {
  constructor(
    @InjectRepository(UserStory)
    private readonly userStoriesRepository: Repository<UserStory>,
  ) {}

  async create({ userId, storyId }: ICreate): Promise<UserStory> {
    const isExisted = await this.userStoriesRepository.findOneBy({ userId, storyId });
    if (isExisted) throw new MethodNotAllowedException();
    const userStory = new UserStory();
    userStory.userId = userId;
    userStory.storyId = storyId;
    userStory.votePoint = null;
    return this.userStoriesRepository.save(userStory);
  }

  async update({ userId, storyId, votePoint }: IUpdate): Promise<UserStory> {
    const userStory = await this.userStoriesRepository.findOneBy({ userId, storyId });
    if (!userStory) throw new MethodNotAllowedException();
    userStory.votePoint = votePoint;
    return this.userStoriesRepository.save(userStory);
  }

  findOne(userId: string, storyId: string): Promise<UserStory> {
    return this.userStoriesRepository.findOneBy({ userId, storyId });
  }

  findAll(): Promise<UserStory[]> {
    return this.userStoriesRepository.find();
  }
}
