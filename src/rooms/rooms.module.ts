import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './rooms.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
