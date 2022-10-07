import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserStoriesController } from './userStory.controller';
import { UserStoriesService } from './userStory.service';
import { UserStory } from './userStory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStory]), AuthModule],
  controllers: [UserStoriesController],
  providers: [UserStoriesService],
  exports: [UserStoriesService],
})
export class UserStoriesModule {}
