import { Body, Controller, Post, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IRequest } from 'src/utils/type';
import { CreateRoomDto } from './room.dto';
import { Room } from './room.entity';
import { RoomsService } from './room.service';

@ApiBearerAuth()
@SkipThrottle()
@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @SkipThrottle(false)
  @Post()
  create(@Req() req: IRequest, @Body() body: CreateRoomDto): Promise<Room> {
    return this.roomsService.create({ ...body, hostUserId: req.user.id });
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findFullOne(@Param('id') id: string) {
    return this.roomsService.findFullOne(id);
  }
}
