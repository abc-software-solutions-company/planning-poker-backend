import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneratePoolDto } from './pool.dto';
import { Pool } from './pool.entity';
import { PoolsService } from './pool.service';

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
}
