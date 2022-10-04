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
import { UserRoomsService } from 'src/database/userRoom/userRoom.service';
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
  handleToast(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { roomId } = socket.handshake.auth;
    this.server.to(roomId).emit('Toast', data);
  }

  @SubscribeMessage('JoinRoom')
  handleJoinRoom(@ConnectedSocket() socket: Socket) {
    const { name, roomId } = socket.handshake.auth;
    const toast: IToastItem = {
      type: 'info',
      title: 'Join Room',
      content: `${name} joined the room`,
    };
    this.server.to(roomId).except(socket.id).emit('Toast', toast);
  }

  @SubscribeMessage('UpdateRoom')
  handleUpdateRoom(@ConnectedSocket() socket: Socket) {
    const { roomId } = socket.handshake.auth;
    this.server.to(roomId).emit('UpdateRoom');
  }

  @SubscribeMessage('UpdateRoomExceptMe')
  handleUpdateRoomExceptMe(@ConnectedSocket() socket: Socket) {
    const { roomId } = socket.handshake.auth;
    this.server.to(roomId).except(socket.id).emit('UpdateRoomExceptMe');
  }
}
