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
  constructor(private readonly userStoryService: UserStoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: IRequest, @Body() body: CreateUserStoryDto): Promise<UserStory> {
    return this.userStoryService.create({ userId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req: IRequest, @Body() body: UpdateUserStoryDto): Promise<UserStory> {
    return this.userStoryService.update({ userId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':storyId')
  find(@Req() req: IRequest, @Param('storyId') storyId: string): Promise<UserStory> {
    return this.userStoryService.findOne(req.user.id, storyId);
  }

  @Get()
  findAll(): Promise<UserStory[]> {
    return this.userStoryService.findAll();
  }
}
