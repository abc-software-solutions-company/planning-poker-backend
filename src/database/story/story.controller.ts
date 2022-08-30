import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoryDto, UpdateStoryDto } from './story.dto';
import { Story } from './story.entity';
import { StoriesService } from './story.service';

@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto): Promise<Story> {
    return this.storiesService.create(createStoryDto);
  }

  @Patch()
  update(@Body() updateStoryDto: UpdateStoryDto): Promise<Story> {
    return this.storiesService.update(updateStoryDto);
  }

  @Get('/finish/:id')
  finish(@Param('id') id: string): Promise<Story> {
    return this.storiesService.finish(id);
  }

  @Get()
  findAll(): Promise<Story[]> {
    return this.storiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Story> {
    return this.storiesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storiesService.remove(id);
  }
}
