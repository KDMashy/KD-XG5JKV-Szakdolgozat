import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/modules/user/entity/user.entity";

export class CreateChannelDto {
    @IsNotEmpty()
    @IsString()
    message_channel: string;

    @IsNotEmpty()
    @IsNumber()
    first_user: number;
    
    @IsNotEmpty()
    @IsNumber()
    second_user: number;

    send_notifications?: string
}

export interface IChannel {
    id?: number;
    message_channel: string;
    first_user: number | User;
    second_user: number | User;
    is_active?: string;
    send_notifications?: string;
}