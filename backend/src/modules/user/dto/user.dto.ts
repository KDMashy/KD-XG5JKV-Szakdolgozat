import { IsNotEmpty, IsEmail, Length, IsString, Matches } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @Length(4, 16)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
    confirmation: string

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;
}

export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
    confirmation?: string;
    first_name?: string;
    last_name?: string;
    status?: string;
}

export class SerialisedUser {
    id?: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    status?: string;

    @Exclude()
    password: string;
}