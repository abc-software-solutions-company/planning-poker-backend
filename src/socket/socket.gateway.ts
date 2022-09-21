import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserRoomsService } from 'src/database/userRoom/index.service';
import { IToastItem } from 'src/utils/type';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketsGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private readonly userRoomsService: UserRoomsService) {}
  @WebSocketServer()
  server: Server;

  handleConnection = async (socket: Socket) => {
    const { id: userId, roomId } = socket.handshake.auth;
    socket.join(roomId);
    await this.userRoomsService.update({ userId, roomId, isOnline: true });
    this.server.to(roomId).emit('UpdateRoom');
  };

  handleDisconnect = async (socket: Socket) => {
    const { id: userId, roomId } = socket.handshake.auth;
    await this.userRoomsService.update({ userId, roomId, isOnline: false });
    this.server.to(roomId).emit('UpdateRoom');
  };

  @SubscribeMessage('Toast')
  toast(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    console.log('🚀 ~ file: index.gateway.ts ~ line 27 ~ SocketsGateway ~ toast ~ data', data);
    const { roomId } = socket.handshake.auth;
    this.server.to(roomId).emit('Toast', data);
  }

  @SubscribeMessage('JoinRoom')
  joinRoom(@ConnectedSocket() socket: Socket) {
    const { name, roomId } = socket.handshake.auth;
    const toast: IToastItem = {
      type: 'info',
      title: 'Join Room',
      content: `${name} joined the room`,
    };
    this.server.to(roomId).except(socket.id).emit('Toast', toast);
    this.server.to(roomId).emit('UpdateRoom');
  }

  @SubscribeMessage('UpdateRoom')
  updateRoom(@ConnectedSocket() socket: Socket) {
    const { roomId } = socket.handshake.auth;
    this.server.to(roomId).emit('UpdateRoom');
  }
}
