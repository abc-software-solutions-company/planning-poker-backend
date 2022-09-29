import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './pool.entity';
import { PoolsController } from './pool.controller';
import { PoolsService } from './pool.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pool])],
  providers: [PoolsService],
  controllers: [PoolsController],
  exports: [PoolsService],
})
export class PoolsModule {}
