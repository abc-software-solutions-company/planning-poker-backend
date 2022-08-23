import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './stories.entity';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Story])],
  providers: [StoriesService],
  controllers: [StoriesController],
  exports: [StoriesService],
})
export class StoriesModule {}
