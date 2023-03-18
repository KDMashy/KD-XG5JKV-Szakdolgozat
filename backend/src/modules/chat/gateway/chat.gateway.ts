import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway(8001, {cors: {
    origin: 'http://localhost:3000',
    credentials: true
}})
export class ChatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message) {
        this.server.emit(message.channel, message);
    }

    @SubscribeMessage('notification')
    handleNotification(@MessageBody() notification) {

    }

    @SubscribeMessage('connection')
    handleConnection(@MessageBody() connection) {
        
    }
}