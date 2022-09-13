import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './index.entity';
import { RoomsController } from './index.controller';
import { RoomsService } from './index.service';
import { PoolsModule } from '../pool/index.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), PoolsModule],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
