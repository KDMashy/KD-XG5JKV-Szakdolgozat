import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ConnectedSocket } from "@nestjs/websockets/decorators";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets/interfaces";

@WebSocketGateway(8001, {cors: {
    origin: 'http://localhost:3000',
    credentials: true
}})
export class ChatGateway{
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message, @ConnectedSocket() socket) {
        this.server.emit(message.channel, message);
    }
}