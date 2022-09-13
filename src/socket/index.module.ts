import { Module } from '@nestjs/common';
import { SocketsGateway } from './index.gateway';

@Module({
  providers: [SocketsGateway],
})
export class SocketsModule {}
