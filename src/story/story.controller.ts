import { Body, Controller, Post, Patch, Param, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CompleteStoryDto, CreateStoryDto, UpdateStoryDto } from './story.dto';
import { Story } from './story.entity';
import { StoriesService } from './story.service';

@ApiBearerAuth()
@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(createStoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateStoryDto: UpdateStoryDto): Promise<Story> {
    return this.storiesService.update(updateStoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('complete')
  complete(@Body() completeStoryDto: CompleteStoryDto): Promise<Story> {
    return this.storiesService.complete(completeStoryDto);
  }

  @Get()
  findAll(): Promise<Story[]> {
    return this.storiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Story> {
    return this.storiesService.findOne(id);
  }
}
