import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminTestsService } from '@/modules/api/v1/admin/tests/admin-tests.service';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/admin/tests')
export class AdminTestsController {
    constructor (
        private readonly _adminTestsService: AdminTestsService,
    ) {
    }

    // TODO: Add guard
    @Get(':id')
    @UseGuards(HeaderVerifiedUserGuard)
    getOneById (
        @Param('id') id: string,
    ) {
        return this._adminTestsService.getOneById(id);
    }

    // TODO: Add guard
    @Get()
    @UseGuards(HeaderVerifiedUserGuard)
    getMany () {
        return this._adminTestsService.getMany();
    }

    @Get('/unlinked-for-question/:questionId')
    @UseGuards(HeaderVerifiedUserGuard)
    getUnlinkedForQuestion (
        @Param('questionId') id: string,
    ) {
        return this._adminTestsService.getUnlinkedForQuestion(id);
    }
}