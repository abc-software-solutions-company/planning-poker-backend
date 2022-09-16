import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRoomsController } from './index.controller';
import { UserRoom } from './index.entity';
import { UserRoomsService } from './index.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoom]), AuthModule],
  providers: [UserRoomsService],
  controllers: [UserRoomsController],
  exports: [UserRoomsService],
})
export class UserRoomsModule {}
