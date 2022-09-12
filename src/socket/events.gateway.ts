import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: {origin: '*'}})
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  handleConnection(socket:Socket){
    // console.log(socket);
    // socket.join(socket.handshake.headers.room)
  }
  @SubscribeMessage('room')
  room(@MessageBody() data: any, @ConnectedSocket() socket:Socket ) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 14 ~ EventsGateway ~ room ~ data", data)
    socket.join(String(data.roomId))
  }
  @SubscribeMessage('update')
  update(@MessageBody() data: any, @ConnectedSocket() socket:Socket ) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 18 ~ EventsGateway ~ update ~ data", data)
    this.server.to(String(data.roomId)).emit('update');
  }
}
