import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserStoriesController } from './index.controller';
import { UserStory } from './index.entity';
import { UserStoriesService } from './index.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStory]), AuthModule],
  providers: [UserStoriesService],
  controllers: [UserStoriesController],
  exports: [UserStoriesService],
})
export class UserStoriesModule {}
