import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
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

  @Get('all/:roomId')
  findAllbyRoom(@Param('roomId') roomId: string): Promise<UserRoom[]> {
    return this.userRoomService.findAllbyRoom(roomId);
  }

  @Get(':roomId')
  findFullOne(@Param('roomId') roomId: string): Promise<UserRoom> {
    return this.userRoomService.findFullOne(roomId);
  }

  @Delete(':userId/:roomId')
  remove(@Param('userId') userId: string, @Param('roomId') roomId: string): Promise<void> {
    return this.userRoomService.remove(userId, roomId);
  }
}
