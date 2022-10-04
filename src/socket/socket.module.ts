import { Module } from '@nestjs/common';
import { UserRoomsModule } from 'src/database/userRoom/userRoom.module';
import { SocketsGateway } from './socket.gateway';

@Module({
  imports: [UserRoomsModule],
  providers: [SocketsGateway],
})
export class SocketsModule {}
