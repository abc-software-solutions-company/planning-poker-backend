import { Body, Controller, Post, Patch, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomDto, UpdateRoomDto } from './index.dto';
import { Room } from './index.entity';
import { RoomsService } from './index.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Patch()
  update(@Body() updateRoomDto: UpdateRoomDto): Promise<Room> {
    return this.roomsService.update(updateRoomDto);
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findFullOne(@Param('id') id: string): Promise<Room> {
    return this.roomsService.findFullOne(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: number): Promise<void> {
  //   return this.roomsService.remove(id);
  // }
}