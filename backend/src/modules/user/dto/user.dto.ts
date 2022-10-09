import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @Length(4, 16)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export class SerialisedUser {
    id?: number;
    username: string;
    email: string;

    @Exclude()
    password: string;
}