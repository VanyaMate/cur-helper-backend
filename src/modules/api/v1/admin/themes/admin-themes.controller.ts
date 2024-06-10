import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminThemesService } from '@/modules/api/v1/admin/themes/admin-themes.service';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/admin/themes')
export class AdminThemesController {
    constructor (
        private readonly _adminThemesService: AdminThemesService,
    ) {
    }

    // TODO: Add guards
    @Get()
    @UseGuards(HeaderVerifiedUserGuard)
    getList () {
        return this._adminThemesService.getList({}, { sort: [ 'publicId', 'asc' ] });
    }


    @Get('/unlinked-for-question/:questionId')
    @UseGuards(HeaderVerifiedUserGuard)
    getUnlinkedForQuestion (
        @Param('questionId') id: string,
    ) {
        return this._adminThemesService.getUnlinkedForQuestion(id);
    }

    // TODO: Add guards
    @Get(':id')
    @UseGuards(HeaderVerifiedUserGuard)
    getOneById (
        @Param('id') id: string,
    ) {
        return this._adminThemesService.getOneById(id);
    }
}