import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateChannelDto } from '../dto/channel.dto';
import { CreateMessageDto } from '../dto/message.dto';
import { ChatService } from '../service/chat.service';

@Controller('chat')
@UseGuards(AuthenticatedGuard)
export class ChatController {
    constructor (
        private readonly chatService: ChatService
    ) {}

    @Get('channels')
    async GetChannels(@Req() req) {
        return await this.chatService.GetChannels(req.user)
    }

    @Get('messages')
    async GetMessages(@Req() req) {
        return await this.chatService.GetMessages(req.query)
    }

    @Get('notifications')
    async GetNotifications (@Req() req) {
        if(!req.query?.id) return HttpStatus.BAD_REQUEST
        return await this.chatService.GetNotifications(req.query?.id)
    }

    @Post('create-notification')
    async CreateNotification(@Req() req) {
        return await this.chatService.CreateNotification(req.query)
    }

    @Post('create-channel')
    async ChannelCreation(@Body() newChannel: CreateChannelDto) {
        return await this.chatService.CreateChannel(newChannel)
    }
    
    @Post('create-message')
    async MessageCreation(@Body() newMessage: CreateMessageDto) {
        return await this.chatService.CreateMessage(newMessage)
    }
    
    @Put('edit-channel')
    async ChannelEdit(@Body() editChannel: CreateChannelDto) {
        return await this.chatService.EditChannel(editChannel)
    }

    @Put('edit-message')
    async MessageEdit(@Body() editMessage: CreateMessageDto) {
        return await this.chatService.EditMessage(editMessage)
    }
    
    @Put('delete-channel')
    async ChannelDelete(@Body() deleteChannel: CreateChannelDto) {
        return await this.chatService.DeleteChannel(deleteChannel)
    }

    @Put('delete-message')
    async MessageDelete(@Body() deleteMessage: CreateMessageDto) {
        return await this.chatService.DeleteMessage(deleteMessage)
    }

    @Delete('delete-notification')
    async DeleteNotification(@Req() req) {
        return await this.chatService.RemoveNotification(req.query)
    }

    @Delete('delete-multiple-notification')
    async DeleteNotifications(@Req() req) {
        return await this.chatService.RemoveMultipleNotifications(req.query.notifications)
    }
}
