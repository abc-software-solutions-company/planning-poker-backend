import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IRequest } from 'src/utils/type';
import { CreateUserStoryDto, UpdateUserStoryDto } from './index.dto';
import { UserStory } from './index.entity';
import { UserStoriesService } from './index.service';

@ApiBearerAuth()
@ApiTags('UserStory')
@Controller('userStories')
export class UserStoriesController {
  constructor(private readonly userRoomService: UserStoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: IRequest, @Body() body: CreateUserStoryDto): Promise<UserStory> {
    return this.userRoomService.create({ userId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req: IRequest, @Body() body: UpdateUserStoryDto): Promise<UserStory> {
    return this.userRoomService.update({ userId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/:storyId')
  findFullOne(@Param('userId') userId: string, @Param('storyId') storyId: string): Promise<UserStory> {
    return this.userRoomService.findOne(userId, storyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':storyId')
  findFullByStory(@Param('storyId') storyId: string): Promise<UserStory[]> {
    return this.userRoomService.findFullByStory(storyId);
  }
}
