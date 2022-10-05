import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRoomsController } from './userRoom.controller';
import { UserRoom } from './userRoom.entity';
import { UserRoomsService } from './userRoom.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoom]), AuthModule],
  providers: [UserRoomsService],
  controllers: [UserRoomsController],
  exports: [UserRoomsService],
})
export class UserRoomsModule {}
