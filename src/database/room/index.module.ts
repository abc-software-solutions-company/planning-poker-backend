import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './index.entity';
import { RoomsController } from './index.controller';
import { RoomsService } from './index.service';
import { PoolsModule } from '../pool/index.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../user/index.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), PoolsModule, AuthModule, UsersModule],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
