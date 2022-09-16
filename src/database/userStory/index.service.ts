import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStory } from './index.entity';

const votePointArr = [0, 1, 2, 3, 5, 8, 13, 21];
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

  create({ userId, storyId }: ICreate): Promise<UserStory> {
    const userStory = new UserStory();
    userStory.userId = userId;
    userStory.storyId = storyId;
    userStory.votePoint = null;
    return this.userStoriesRepository.save(userStory);
  }

  async update({ userId, storyId, votePoint }: IUpdate): Promise<UserStory> {
    if (!votePointArr.includes(votePoint)) throw new MethodNotAllowedException('This vote point does not allow');
    const userStory = await this.userStoriesRepository.findOneBy({ userId, storyId });
    userStory.votePoint = votePoint;
    return this.userStoriesRepository.save(userStory);
  }

  findOne(userId: string, storyId: string): Promise<UserStory> {
    return this.userStoriesRepository.findOneBy({ userId, storyId });
  }

  findFullByStory(storyId: string): Promise<UserStory[]> {
    return this.userStoriesRepository.findBy({ storyId });
  }
}
