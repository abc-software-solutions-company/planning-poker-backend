import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketsGateway {
  @WebSocketServer()
  server: Server;
  memory: any;

  @SubscribeMessage('Join')
  join(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.join(String(data.roomId));
  }

  @SubscribeMessage('JoinRoom')
  joinRoom(@MessageBody() data: any) {
    this.server.to(String(data.roomId)).emit('ToastJoinRoom', data.auth);
    this.server.to(String(data.roomId)).emit('UpdateRoom');
  }

  @SubscribeMessage('UpdateRoom')
  updateRoom(@MessageBody() data: any) {
    this.server.to(String(data.roomId)).emit('UpdateRoom');
  }
}
