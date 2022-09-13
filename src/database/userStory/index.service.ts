import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserStoryDto, UpdateUserStoryDto } from './index.dto';
import { UserStory } from './index.entity';

@Injectable()
export class UserStoriesService {
  constructor(
    @InjectRepository(UserStory)
    private readonly userStoriesRepository: Repository<UserStory>,
  ) {}

  create(createUserStory: CreateUserStoryDto): Promise<UserStory> {
    const { userId, storyId, votePoint } = createUserStory;
    const userStory = new UserStory();
    userStory.userId = userId;
    userStory.storyId = storyId;
    userStory.votePoint = votePoint;
    return this.userStoriesRepository.save(userStory);
  }

  async update(updateUserStory: UpdateUserStoryDto): Promise<UserStory> {
    const { userId, storyId, votePoint } = updateUserStory;
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
