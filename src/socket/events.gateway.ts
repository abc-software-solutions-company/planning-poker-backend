import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('update')
  handleEvent() {
    this.server.emit('update');
  }
  @SubscribeMessage('identity')
  identity(@MessageBody() data: any) {
    console.log('🚀 ~ file: events.gateway.ts ~ line 19 ~ EventsGateway ~ identity ~ data', data);
    return data;
  }
}
