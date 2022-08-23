import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './stories.entity';
import { StoriesService } from './stories.service';

@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto): Promise<Story> {
    return this.storiesService.create(createStoryDto);
  }

  @Get()
  findAll(): Promise<Story[]> {
    return this.storiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Story> {
    return this.storiesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storiesService.remove(id);
  }
}
