import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './controller/chat.controller';
import { Channel } from './entity/channel.entity';
import { Message } from './entity/message.entity';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './service/chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel, Message
    ])
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
  exports: [
    ChatService
  ]
})
export class ChatModule {}
