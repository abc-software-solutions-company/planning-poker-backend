import { Body, Controller, Post, Patch, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IRequest } from 'src/utils/type';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';
import { Room } from './room.entity';
import { RoomsService } from './room.service';

@ApiBearerAuth()
@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: IRequest, @Body() body: CreateRoomDto): Promise<Room> {
    return this.roomsService.create({ ...body, hostUserId: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() body: UpdateRoomDto): Promise<Room> {
    return this.roomsService.update(body);
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
