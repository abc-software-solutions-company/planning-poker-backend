import { Body, Controller, Get, Param, Post, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IRequest } from 'src/utils/type';
import { CreateUserRoomDto, UpdateUserRoomDto } from './index.dto';
import { UserRoom } from './index.entity';
import { UserRoomsService } from './index.service';

@ApiBearerAuth()
@ApiTags('UserRoom')
@Controller('userRooms')
export class UserRoomsController {
  constructor(private readonly userRoomService: UserRoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: IRequest, @Body() body: CreateUserRoomDto): Promise<UserRoom> {
    return this.userRoomService.create({ userId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req: IRequest, @Body() body: UpdateUserRoomDto): Promise<UserRoom> {
    return this.userRoomService.update({ userId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: IRequest): Promise<UserRoom[]> {
    console.log(req.user);
    return this.userRoomService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/:roomId')
  findOne(@Param('userId') userId: string, @Param('roomId') roomId: string): Promise<UserRoom> {
    return this.userRoomService.findOne(userId, roomId);
  }
}
