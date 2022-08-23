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
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.roomsService.remove(id);
  }
}
