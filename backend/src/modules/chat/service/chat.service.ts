import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/service/user.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from '../dto/channel.dto';
import { CreateMessageDto, IMessage } from '../dto/message.dto';
import { Channel } from '../entity/channel.entity';
import { Message } from '../entity/message.entity';
import { Notification } from '../entity/notification.entity';

@Injectable()
export class ChatService {
    constructor (
        @InjectRepository(Channel)
        private readonly channelModel: Repository<Channel>,
        @InjectRepository(Message)
        private readonly messageModel: Repository<Message>,
        @InjectRepository(Notification)
        private readonly notificationModel: Repository<Notification>,
        // private userService: UserService
    ) {}

    async GetChannels (user) {
        // return await this.channelModel.find({
        //     where: [
        //         {first_user: user?.id},
        //         {second_user: user?.id}
        //     ],
        //     relations: [
        //         'first_user',
        //         'second_user'
        //     ]
        // })
        return await this.channelModel
            .createQueryBuilder('channel')
            .innerJoinAndMapOne('channel.first_user', User, 'first_user', 'channel.first_user = first_user.id')
            .innerJoinAndMapOne('channel.second_user', User, 'second_user', 'channel.second_user = second_user.id')
            .where('channel.first_user = :id', {id: user?.id})
            .orWhere('channel.second_user = :id', {id: user?.id})
            .getMany();
    }

    async GetMessages (options) {
        return await this.messageModel.find({
            where: {
                channel: parseInt(options.id)
            },
            skip: options.offset,
            take: options.limit,
        })
    }

    //CREATE
    async CreateChannel (newChannel: CreateChannelDto) {
        let newChannelRecord = await this.channelModel.create(newChannel);
        return await newChannelRecord.save();
    }

    //CREATE
    async CreateMessage (newMessage: CreateMessageDto) {
        let newMessageRecord = await this.messageModel.create({
            message_content: newMessage?.message_content,
            need_moderation: newMessage?.need_moderation,
            reported: newMessage?.reported,
            edited: newMessage?.edited,
            deleted: newMessage?.deleted,
            admin_notification: newMessage?.admin_notification,
            readed: newMessage?.readed,
            channel: newMessage?.channelId,
            sender: newMessage?.senderId
        });
        
        return await newMessageRecord.save();
    }

    //EDIT,MODERATE
    async EditMessage (editMessage: CreateMessageDto) {
        let foundMessage = await this.messageModel.findOne({
            where: {id: editMessage?.id}
        })
        if(foundMessage) {
            editMessage.edited = 'true'
            let edited = await this.messageModel.create(editMessage);
            return await this.messageModel.update(
                foundMessage?.id,
                edited
            );
        }
        return HttpStatus.CONFLICT;
    }

    //EDIT CHANNEL
    async EditChannel (editChannel: CreateChannelDto) {
        let foundChannel = await this.channelModel.findOne({
            where: {id: editChannel?.id}
        });
        if(foundChannel) {
            let edited = await this.channelModel.create(foundChannel);
            return await this.channelModel.update(
                foundChannel?.id,
                edited
            );
        }
        return HttpStatus.CONFLICT;
    }

    //REMOVE SOFT MESSAGE
    async DeleteMessage (message: CreateMessageDto) {
        let foundMessage = await this.messageModel.findOne({
            where: {id: message?.id}
        })
        if(!foundMessage) return HttpStatus.BAD_REQUEST;

        foundMessage.deleted = 'true';
        return await foundMessage.save();
    }

    //REMOVE HARD CHANNEL
    async DeleteChannel (channel) {
        let foundChannel = await this.channelModel.findOne({
            where: {id: channel}
        })
        if(!foundChannel) return HttpStatus.BAD_REQUEST;

        return await this.channelModel.remove(foundChannel);
    }

    async DeleteChannelForTeamMember (member) {
        let foundChannel = await this.channelModel.findOne({
            where: {id: member?.sender?.id}
        })
        if(!foundChannel) return HttpStatus.BAD_REQUEST;

        await this.channelModel.remove(member.sender)

        // return await this.channelModel
        //     .createQueryBuilder()
        //     .delete()
        //     .from(Channel)
        //     .where('first_user = :id', {id: member?.id})
        //     .andWhere('message_channel = :channel', {channel: member?.sender?.message_channel})
    }

    //REMOVE HARD
    // async DeleteChatComponent (id, model){
    //     if(!model || !id) return HttpStatus.BAD_REQUEST;
    //     let modelType = null
    //     if(model === "channel"){
    //         modelType = this.channelModel
    //     } else modelType = this.messageModel

    //     let found = await modelType.findOne({
    //         where: {
    //             id: id
    //         }
    //     })
    //     if (!found) return HttpStatus.CONFLICT;

    //     return await modelType.remove(found)
    // }

    // async CheckIfOnline (user_id) {
    //     let found:User = await this.userService.findUserById(user_id)
    //     if(!found) return "404"
    //     if(found?.active_notifications === "true") return true
    //     return false
    // }

    async GetNotifications (id) {
        return await this.notificationModel.find({
            where: {user: id},
            relations: [
                'user'
            ]
        })
    }

    async CreateNotification (req: {
        user_id: number,
        content: string;
        type: "project" | "message"
    }) {
        if(!req.user_id || !req.content) return HttpStatus.BAD_REQUEST

        let newNotification = await this.notificationModel.create({
            user: req.user_id,
            content: req.content
        })

        if(!newNotification) return HttpStatus.CONFLICT

        let response = await newNotification.save()

        if(!response) return HttpStatus.CONFLICT

        return {
            message: "Sent notification",
            response: response
        }
    }

    async RemoveNotification (req: {
        id: number
    }) {
        if(!req.id) return HttpStatus.BAD_REQUEST

        let found = await this.notificationModel.findOne({
            where: {
                id: req.id
            }
        })

        if(!found) return HttpStatus.CONFLICT

        let response = await this.notificationModel.remove(found)
    }

    async RemoveMultipleNotifications (list) {
        list.map(async item => {
            await this.RemoveNotification(item)
        })
    }
}
