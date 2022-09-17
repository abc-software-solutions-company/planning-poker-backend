import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.join(String(data.roomId));
  }

  @SubscribeMessage('updateRoom')
  updateRoom(@MessageBody() data: any) {
    this.server.to(String(data.roomId)).emit('updateRoom');
  }
}
