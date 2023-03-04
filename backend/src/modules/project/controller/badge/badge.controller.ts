import { CreateBadgeDto, UpdateBadgeDto } from './../../dto/badge.dto';
import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common/decorators';
import { BadgeService } from '../../service/badge/badge.service';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';

@Controller('badge')
@UseGuards(AuthenticatedGuard)
export class BadgeController {
    constructor (
        private readonly badgeService: BadgeService
    ) {}

    @Get('')
    index() {
        return this.badgeService.index()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.badgeService.getOneById(id)
    }

    @Post('')
    create(@Body() badge: CreateBadgeDto) {
        return this.badgeService.createBadge(badge)
    }

    @Put(':id')
    update(@Body() badge: UpdateBadgeDto, @Param('id', ParseIntPipe) id: number) {
        return this.badgeService.updateBadge(badge, id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.badgeService.deleteBadge(id)
    }
}
