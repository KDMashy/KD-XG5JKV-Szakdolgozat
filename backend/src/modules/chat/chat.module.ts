import { Module } from '@nestjs/common';
import { ChatController } from './controller/chat.controller';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './service/chat.service';

@Module({
  providers: [ChatService, ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {}
