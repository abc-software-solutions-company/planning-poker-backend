import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './index.entity';
import { StoriesController } from './index.controller';
import { StoriesService } from './index.service';

@Module({
  imports: [TypeOrmModule.forFeature([Story])],
  providers: [StoriesService],
  controllers: [StoriesController],
  exports: [StoriesService],
})
export class StoriesModule {}
