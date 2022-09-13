import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRoomDto, UpdateUserRoomDto } from './index.dto';
import { UserRoom } from './index.entity';
import { UserRoomsService } from './index.service';

@ApiTags('UserRoom')
@Controller('userRooms')
export class UserRoomsController {
  constructor(private readonly userRoomService: UserRoomsService) {}

  @Post()
  create(@Body() createUserRoomDto: CreateUserRoomDto): Promise<UserRoom> {
    return this.userRoomService.create(createUserRoomDto);
  }

  @Patch()
  update(@Body() updateUserRoomDto: UpdateUserRoomDto): Promise<UserRoom> {
    return this.userRoomService.update(updateUserRoomDto);
  }

  @Get()
  findAll(): Promise<UserRoom[]> {
    return this.userRoomService.findAll();
  }

  @Get(':userId/:roomId')
  findOne(@Param('userId') userId: string, @Param('roomId') roomId: string): Promise<UserRoom> {
    return this.userRoomService.findOne(userId, roomId);
  }
}
