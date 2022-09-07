import { Body, Controller, Post, Patch, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CompleteStoryDto, CreateStoryDto, UpdateStoryDto } from './story.dto';
import { Story } from './story.entity';
import { StoriesService } from './story.service';

@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  async create(@Body() createStoryDto: CreateStoryDto, @Res({ passthrough: true }) res: Response) {
    const s = await this.storiesService.create(createStoryDto);
    if (s === 405) {
      return res.status(405).json({
        statusCode: 405,
        message: 'Bad Request',
        timestamp: new Date().toISOString(),
      });
    }
    return this.storiesService.create(createStoryDto);
  }

  @Patch()
  update(@Body() updateStoryDto: UpdateStoryDto): Promise<Story> {
    return this.storiesService.update(updateStoryDto);
  }

  @Patch('complete')
  complete(@Body() completeStoryDto: CompleteStoryDto): Promise<Story> {
    return this.storiesService.complete(completeStoryDto);
  }

  // @Get()
  // findAll(): Promise<Story[]> {
  //   return this.storiesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Story> {
  //   return this.storiesService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.storiesService.remove(id);
  // }
}
