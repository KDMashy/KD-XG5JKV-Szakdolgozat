import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ChatController } from './controller/chat.controller';
import { Channel } from './entity/channel.entity';
import { Message } from './entity/message.entity';
import { Notification } from './entity/notification.entity';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './service/chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel, Message, Notification
    ]),
    // UserModule
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
  exports: [
    ChatService
  ]
})
export class ChatModule {}
