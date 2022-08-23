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
import { CreateUserStoryRoomDto } from './dto/create-user-story-room.dto';
import { UserStoryRoom } from './user-story-rooms.entity';
import { UserStoryRoomsService } from './user-story-rooms.service';

@ApiTags('UserStoryRoom')
@Controller('user_story_rooms')
export class UserStoryRoomsController {
  constructor(private readonly userStoryRoomsService: UserStoryRoomsService) {}

  // @Post()
  // create(
  //   @Body() createUserStoryRoomDto: CreateUserStoryRoomDto,
  // ): Promise<UserStoryRoom> {
  //   return this.userStoryRoomsService.create(createUserStoryRoomDto);
  // }

  // @Get()
  // findAll(): Promise<UserStoryRoom[]> {
  //   return this.userStoryRoomsService.findAll();
  // }

  // @Get(':user_id/:story_id/:room_id')
  // findOne(
  //   @Param('user_id', ParseIntPipe) user_id: string,
  //   @Param('story_id', ParseIntPipe) story_id: string,
  //   @Param('room_id', ParseIntPipe) room_id: number,
  // ): Promise<UserStoryRoom> {
  //   return this.userStoryRoomsService.findOne(user_id, story_id, room_id);
  // }

  // @Delete(':user_id/:story_id/:room_id')
  // remove(
  //   @Param('user_id', ParseIntPipe) user_id: string,
  //   @Param('story_id', ParseIntPipe) story_id: string,
  //   @Param('room_id', ParseIntPipe) room_id: number,
  // ): Promise<void> {
  //   return this.userStoryRoomsService.remove(user_id, story_id, room_id);
  // }
}
