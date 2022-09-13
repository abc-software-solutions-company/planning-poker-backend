import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneratePoolDto } from './index.dto';
import { Pool } from './index.entity';
import { PoolsService } from './index.service';

@ApiTags('Pools')
@Controller('pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @Post('generate')
  generate(@Body() { num }: GeneratePoolDto) {
    return this.poolsService.generate(num);
  }

  @Get()
  findAll(): Promise<Pool[]> {
    return this.poolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pool> {
    return this.poolsService.findOne(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.poolsService.remove(id);
  // }
}
