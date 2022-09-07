import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActsController } from './act.controller';
import { Act } from './act.entity';
import { ActsService } from './act.service';

@Module({
  imports: [TypeOrmModule.forFeature([Act])],
  providers: [ActsService],
  controllers: [ActsController],
  exports: [ActsService],
})
export class ActsModule {}
