import { User } from 'src/modules/user/entity/user.entity';
import { Teams } from './../entity/teams.entity';
import { Team } from './../entity/team.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor (
        @InjectRepository(Team)
        private teamModel: Repository<Team>,
        @InjectRepository(Teams)
        private teamsModel: Repository<Teams>,
        @InjectRepository(User)
        private userModel: Repository<User>
    ) {}

    async index() {
        return await this.teamsModel
            .find({
                relations: [
                    "user",
                    "project",
                    "team"
                ]
            })
    }
}
