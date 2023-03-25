import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateChannelDto } from '../dto/channel.dto';
import { CreateMessageDto } from '../dto/message.dto';
import { ChatService } from '../service/chat.service';

@Controller('chat')
export class ChatController {
    constructor (
        private readonly chatService: ChatService
    ) {}

    @UseGuards(AuthenticatedGuard)
    @Get('channels')
    async GetChannels(@Req() req) {
        return await this.chatService.GetChannels(req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('messages')
    async GetMessages(@Req() req) {
        return await this.chatService.GetMessages(req.query)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('create-channel')
    async ChannelCreation(@Body() newChannel: CreateChannelDto) {
        return await this.chatService.CreateChannel(newChannel)
    }
    
    @UseGuards(AuthenticatedGuard)
    @Post('create-message')
    async MessageCreation(@Body() newMessage: CreateMessageDto) {
        return await this.chatService.CreateMessage(newMessage)
    }
    
    @UseGuards(AuthenticatedGuard)
    @Put('edit-channel')
    async ChannelEdit(@Body() editChannel: CreateChannelDto) {
        return await this.chatService.EditChannel(editChannel)
    }

    @UseGuards(AuthenticatedGuard)
    @Put('edit-message')
    async MessageEdit(@Body() editMessage: CreateMessageDto) {
        return await this.chatService.EditMessage(editMessage)
    }
    
    @UseGuards(AuthenticatedGuard)
    @Put('delete-channel')
    async ChannelDelete(@Body() deleteChannel: CreateChannelDto) {
        return await this.chatService.DeleteChannel(deleteChannel)
    }

    @UseGuards(AuthenticatedGuard)
    @Put('delete-message')
    async MessageDelete(@Body() deleteMessage: CreateMessageDto) {
        return await this.chatService.DeleteMessage(deleteMessage)
    }
}
