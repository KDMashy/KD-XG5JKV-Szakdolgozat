import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    task_name: string

    @IsNotEmpty()
    task_creator: number

    @IsNotEmpty()
    project_id: number

    @IsNotEmpty()
    task_only_creator: number

    @IsNotEmpty()
    row: number
}

export class UpdateTaskDto {
    task_name?: string

    task_creator?: number

    project_id?: number

    task_only_creator?: number
}