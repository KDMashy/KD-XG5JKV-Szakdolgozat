import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginAdminDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
    password: string;
}

export interface IAdmin {
    id?: number;
    username: string;
    email: string;
    password: string;
}