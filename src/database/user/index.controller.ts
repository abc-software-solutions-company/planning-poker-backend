import { Body, Controller, Post, Patch, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto, UpdateUserDto } from './index.dto';
import { User } from './index.entity';
import { UsersService } from './index.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(updateUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      if (user) return user;
      return res.sendStatus(401);
    } catch {
      return res.sendStatus(401);
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
