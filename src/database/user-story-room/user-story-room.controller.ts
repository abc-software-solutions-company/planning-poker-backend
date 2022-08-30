import { Body, Controller, Delete, Get, Param, Post, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserStoryRoomDto, UpdateUserStoryRoomDto } from './user-story-room.dto';
import { UserStoryRoom } from './user-story-room.entity';
import { UserStoryRoomsService } from './user-story-room.service';

@ApiTags('UserStoryRoom')
@Controller('user-story-rooms')
export class UserStoryRoomsController {
  constructor(private readonly usrService: UserStoryRoomsService) {}

  @Post()
  create(@Body() createUserStoryRoomDto: CreateUserStoryRoomDto): Promise<UserStoryRoom> {
    return this.usrService.create(createUserStoryRoomDto);
  }

  @Patch()
  update(@Body() updateUserStoryRoomDto: UpdateUserStoryRoomDto): Promise<UserStoryRoom> {
    return this.usrService.update(updateUserStoryRoomDto);
  }

  @Get('all/:roomId')
  findAllbyRoom(@Param('roomId') roomId: number): Promise<UserStoryRoom[]> {
    return this.usrService.findAllbyRoom(roomId);
  }

  @Get(':roomId')
  findFullOne(@Param('roomId') roomId: number): Promise<UserStoryRoom> {
    return this.usrService.findFullOne(roomId);
  }

  @Delete(':userId/:storyId/:roomId')
  remove(@Param('userId') userId: string, @Param('storyId') storyId: string, @Param('roomId') roomId: number): Promise<void> {
    return this.usrService.remove(userId, storyId, roomId);
  }
}
