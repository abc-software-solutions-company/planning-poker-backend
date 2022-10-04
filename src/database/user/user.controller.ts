import { Controller, UseGuards, Patch, Req, Body, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IRequest } from 'src/utils/type';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req: IRequest, @Body() body: UpdateUserDto): Promise<User> {
    return this.usersService.update({ ...body, id: req.user.id });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
