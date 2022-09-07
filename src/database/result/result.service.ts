import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto, UpdateResultDto } from './result.dto';
import { Result } from './result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultsRepository: Repository<Result>,
  ) {}

  create(createResult: CreateResultDto): Promise<Result> {
    const { userId, storyId, votePoint } = createResult;
    const result = new Result();
    result.userId = userId;
    result.storyId = storyId;
    result.votePoint = votePoint;
    return this.resultsRepository.save(result);
  }

  async update(updateResult: UpdateResultDto): Promise<Result> {
    const { userId, storyId, votePoint } = updateResult;
    const result = await this.resultsRepository.findOneBy({ userId, storyId });
    result.votePoint = votePoint;
    return this.resultsRepository.save(result);
  }
  findOne(userId, storyId): Promise<Result> {
    return this.resultsRepository.findOneBy({ userId, storyId });
  }
  findFullByStory(storyId): Promise<Result[]> {
    return this.resultsRepository.findBy({ storyId });
  }
}
