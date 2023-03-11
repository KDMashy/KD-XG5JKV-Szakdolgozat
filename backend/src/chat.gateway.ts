import { UseGuards } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AuthenticatedGuard } from "./modules/auth/utils/guards/local.guard";

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
}