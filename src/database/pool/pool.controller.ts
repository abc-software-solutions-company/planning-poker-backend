import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneratePoolDto } from './pool.dto';
import { PoolsService } from './pool.service';

@ApiTags('Pools')
@Controller('pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @Post('generate')
  generate(@Body() { num }: GeneratePoolDto) {
    return this.poolsService.generate(num);
  }

  @Get('Status')
  status() {
    return this.poolsService.status();
  }
}
