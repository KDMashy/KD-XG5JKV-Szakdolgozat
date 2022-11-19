import { Controller, Get } from '@nestjs/common';
import { TeamService } from '../service/team.service';

@Controller('team')
export class TeamController {
    constructor (
        private readonly teamService: TeamService
    ) {}

    @Get('/teams')
    index() {
        return this.teamService.index()
    }
}
