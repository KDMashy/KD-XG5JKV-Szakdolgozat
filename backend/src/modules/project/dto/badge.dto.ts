import { IsNotEmpty, IsString } from "class-validator";

export class CreateBadgeDto {
    @IsNotEmpty()
    @IsString()
    badge_label: string

    @IsNotEmpty()
    badge_creator: number

    @IsNotEmpty()
    badge_only_creator: number

    @IsNotEmpty()
    badge_color: string

    project?: number
    
    task?: number
}

export class UpdateBadgeDto {
    badge_label?: string

    badge_creator?: number

    badge_only_creator?: number

    badge_color?: string

    project?: number

    task?: number
}

