import { Controller } from '@nestjs/common';
import { BadgeService } from '../../service/badge/badge.service';

@Controller('badge')
export class BadgeController {
    constructor (
        private readonly badgeService: BadgeService
    ) {}
}
