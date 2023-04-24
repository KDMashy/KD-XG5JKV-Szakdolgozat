import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
    @IsNotEmpty()
    @IsString()
    team_name: string

    @IsNotEmpty()
    @IsString()
    team_description: string

    @IsNotEmpty()
    team_creator: number

    @IsNotEmpty()
    team_only_creator: number

    project?: number

    team_status?: string
}

export class UpdateTeamDto {
    team_name?: string

    team_description?: string

    team_creator?: number

    team_only_creator?: number

    team_status?: string

    project?: number
}