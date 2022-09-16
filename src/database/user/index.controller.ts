import { Body, Controller, Patch, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IRequest } from 'src/utils/type';
import { UpdateUserDto } from './index.dto';
import { User } from './index.entity';
import { UsersService } from './index.service';

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

  @UseGuards(JwtAuthGuard)
  @Get('infor')
  infor(@Req() req: IRequest) {
    return req.user;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
