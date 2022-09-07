import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateResultDto, UpdateResultDto } from './result.dto';
import { Result } from './result.entity';
import { ResultsService } from './result.service';

@ApiTags('Result')
@Controller('results')
export class ResultsController {
  constructor(private readonly actService: ResultsService) {}

  @Post()
  create(@Body() createResult: CreateResultDto): Promise<Result> {
    return this.actService.create(createResult);
  }
  @Patch()
  update(@Body() updateResult: UpdateResultDto): Promise<Result> {
    return this.actService.update(updateResult);
  }
  @Get(':userId/:storyId')
  findFullOne(@Param('userId') userId: string, @Param('storyId') storyId: string): Promise<Result> {
    return this.actService.findOne(userId, storyId);
  }
  @Get(':storyId')
  findFullByStory(@Param('storyId') storyId: string): Promise<Result[]> {
    return this.actService.findFullByStory(storyId);
  }
}
