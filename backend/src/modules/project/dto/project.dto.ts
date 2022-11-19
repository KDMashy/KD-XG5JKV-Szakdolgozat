import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    project_name: string

    @IsNotEmpty()
    @IsString()
    project_description: string

    // @IsNotEmpty()
    // @IsString()
    // project_img_url: string

    @IsNotEmpty()
    project_creator: number

    @IsNotEmpty()
    project_only_creator: number
}

export class UpdateProjectDto {
    project_name?: string

    project_description?: string

    project_img_url?: string

    project_only_creator?: number

    project_creator?: number

    status?: string
}