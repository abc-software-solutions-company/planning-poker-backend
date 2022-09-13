import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStoriesController } from './index.controller';
import { UserStory } from './index.entity';
import { UserStoriesService } from './index.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStory])],
  providers: [UserStoriesService],
  controllers: [UserStoriesController],
  exports: [UserStoriesService],
})
export class UserStoriesModule {}
