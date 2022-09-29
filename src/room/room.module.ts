import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsController } from './room.controller';
import { RoomsService } from './room.service';
import { PoolsModule } from '../pool/pool.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), PoolsModule, AuthModule, UsersModule],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
