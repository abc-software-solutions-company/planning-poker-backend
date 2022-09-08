import { Body, Controller, Post, Patch, Res, HttpStatus } from '@nestjs/common';
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
    const story = await this.storiesService.create(createStoryDto);
    if (story === 405) {
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        message: 'Err',
        timestamp: new Date().toISOString(),
      });
    } else return story;
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
