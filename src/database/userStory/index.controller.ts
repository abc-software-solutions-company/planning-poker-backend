import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserStoryDto, UpdateUserStoryDto } from './index.dto';
import { UserStory } from './index.entity';
import { UserStoriesService } from './index.service';

@ApiTags('UserStory')
@Controller('userStories')
export class UserStoriesController {
  constructor(private readonly userRoomService: UserStoriesService) {}

  @Post()
  create(@Body() createUserStory: CreateUserStoryDto): Promise<UserStory> {
    return this.userRoomService.create(createUserStory);
  }
  @Patch()
  update(@Body() updateUserStory: UpdateUserStoryDto): Promise<UserStory> {
    return this.userRoomService.update(updateUserStory);
  }
  @Get(':userId/:storyId')
  findFullOne(@Param('userId') userId: string, @Param('storyId') storyId: string): Promise<UserStory> {
    return this.userRoomService.findOne(userId, storyId);
  }
  @Get(':storyId')
  findFullByStory(@Param('storyId') storyId: string): Promise<UserStory[]> {
    return this.userRoomService.findFullByStory(storyId);
  }
}
