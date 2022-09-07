import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateActDto, UpdateActDto } from './act.dto';
import { Act } from './act.entity';
import { ActsService } from './act.service';

@ApiTags('Act')
@Controller('acts')
export class ActsController {
  constructor(private readonly actService: ActsService) {}

  @Post()
  create(@Body() createActDto: CreateActDto): Promise<Act> {
    return this.actService.create(createActDto);
  }

  @Patch()
  update(@Body() updateActDto: UpdateActDto): Promise<Act> {
    return this.actService.update(updateActDto);
  }

  @Get('all/:roomId')
  findAllbyRoom(@Param('roomId') roomId: number): Promise<Act[]> {
    return this.actService.findAllbyRoom(roomId);
  }

  @Get(':roomId')
  findFullOne(@Param('roomId') roomId: number): Promise<Act> {
    return this.actService.findFullOne(roomId);
  }

  @Delete(':userId/:roomId')
  remove(@Param('userId') userId: string, @Param('roomId') roomId: number): Promise<void> {
    return this.actService.remove(userId, roomId);
  }
}
