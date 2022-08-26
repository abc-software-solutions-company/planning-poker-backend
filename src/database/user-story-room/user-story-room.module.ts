import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStoryRoomsController } from './user-story-room.controller';
import { UserStoryRoom } from './user-story-room.entity';
import { UserStoryRoomsService } from './user-story-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStoryRoom])],
  providers: [UserStoryRoomsService],
  controllers: [UserStoryRoomsController],
  exports: [UserStoryRoomsService],
})
export class UserStoryRoomsModule {}
