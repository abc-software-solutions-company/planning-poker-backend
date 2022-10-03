import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PoolsModule } from 'src/pool/pool.module';
import { UsersModule } from 'src/user/user.module';
import { RoomsController } from './room.controller';
import { Room } from './room.entity';
import { RoomsService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), PoolsModule, AuthModule, UsersModule],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
