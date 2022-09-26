import { Body, Controller, Patch, Get, Req, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IRequest } from 'src/utils/type';
import { UpdateUserDto } from './index.dto';
import { User } from './index.entity';
import { UsersService } from './index.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
