import { IsNotEmpty, IsString } from "class-validator";

export class CreateRowDto {
    @IsNotEmpty()
    @IsString()
    row_name: string

    project?: number

    count?: number
}

export class UpdateRowDto {
    row_name?: string

    project?: number

    count?: number
}