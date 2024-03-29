import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PoolsModule } from '../pool/pool.module';
import { UsersModule } from '../user/user.module';
import { RoomsController } from './room.controller';
import { Room } from './room.entity';
import { RoomsService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), PoolsModule, AuthModule, UsersModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
