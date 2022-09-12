import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './index.entity';
import { PoolsController } from './index.controller';
import { PoolsService } from './index.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pool])],
  providers: [PoolsService],
  controllers: [PoolsController],
  exports: [PoolsService],
})
export class PoolsModule {}
