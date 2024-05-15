import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SystemConstant } from '../common/constant';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'system',
  cors: {
    origin: '*:*',
  },
})
export class GatewayService implements OnModuleInit {
  constructor() {}
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`/system | socket id: ${socket.id}`);
    });
  }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage(SystemConstant.EMIT_SYSTEM_EV)
  onMessage() {}

  sendMessage(payload: any, event?: string) {
    this.server.emit(event ?? SystemConstant.EMIT_SYSTEM_EV, payload);
  }
}
