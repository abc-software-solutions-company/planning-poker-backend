import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStoryRoomsController } from './user-story-rooms.controller';
import { UserStoryRoom } from './user-story-rooms.entity';
import { UserStoryRoomsService } from './user-story-rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStoryRoom])],
  providers: [UserStoryRoomsService],
  controllers: [UserStoryRoomsController],
  exports: [UserStoryRoomsService],
})
export class UserStoryRoomsModule {}
