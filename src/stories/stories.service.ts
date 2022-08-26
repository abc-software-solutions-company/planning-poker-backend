import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoryDto, UpdateStoryDto } from './stories.dto';
import { Story } from './stories.entity';

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

  async findAll(): Promise<Story[]> {
    return this.storiesRepository.find();
  }

  async update(updateStoryDto: UpdateStoryDto): Promise<Story> {
    const { id, name, avgPoint: avg_point } = updateStoryDto;
    const story = await this.storiesRepository.findOneBy({ id });
    story.name = name || story.name;
    story.avg_point = avg_point || story.avg_point;
    return this.storiesRepository.save(story);
  }

  findOne(id: string): Promise<Story> {
    return this.storiesRepository.findOneBy({ id: id });
  }
  async remove(id: string): Promise<void> {
    await this.storiesRepository.delete(id);
  }
}
