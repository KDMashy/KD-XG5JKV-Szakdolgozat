import { CreateBadgeDto, UpdateBadgeDto } from './../../dto/badge.dto';
import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common/decorators';
import { BadgeService } from '../../service/badge/badge.service';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';

@Controller('badge')
@UseGuards(AuthenticatedGuard)
export class BadgeController {
    constructor (
        private readonly badgeService: BadgeService
    ) {}

    @Get('')
    index(@Req() req) {
        return this.badgeService.index(req.query.id)
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.badgeService.getOneById(id)
    }

    @Post('')
    create(@Body() badge: CreateBadgeDto) {
        return this.badgeService.createBadge(badge)
    }

    @Post('add-for-task')
    addForTask(@Body() info) {
        return this.badgeService.addOrDeleteBadgeFromTask("add", info)
    }

    @Put(':id')
    update(@Body() badge: UpdateBadgeDto, @Param('id', ParseIntPipe) id: number) {
        return this.badgeService.updateBadge(badge, id)
    }

    @Put('remove-from-task')
    deleteFromTask(@Body() info) {
        return this.badgeService.addOrDeleteBadgeFromTask("delete", info)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.badgeService.deleteBadge(id)
    }
}
