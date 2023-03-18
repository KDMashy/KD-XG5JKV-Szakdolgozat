import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/modules/user/entity/user.entity";
import { Channel } from "../entity/channel.entity";

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    message_content: string;

    @IsNotEmpty()
    @IsNumber()
    channel: number;
    
    @IsNotEmpty()
    @IsNumber()
    sender: number;

    need_moderation?: string;
}

export interface IMessage {
    id?: number;
    message_content: string;
    need_moderation?: string;
    reported?: string;
    edited?: string;
    deleted?: string;
    admin_notification?: string;
    readed?: string;
    channel: number | Channel;
    sender: number | User
}