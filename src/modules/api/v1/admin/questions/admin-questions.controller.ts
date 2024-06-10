import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
    AdminQuestionsService,
} from '@/modules/api/v1/admin/questions/admin-questions.service';
import {
    HeaderVerifiedUserGuard,
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/admin/questions')
export class AdminQuestionsController {
    constructor (private readonly _adminQuestionService: AdminQuestionsService) {
    }

    @Get('/list')
    @UseGuards(HeaderVerifiedUserGuard)
    findMany () {
        return this._adminQuestionService.findMany();
    }

    @Get('/unlinked-for-test/:testId')
    @UseGuards(HeaderVerifiedUserGuard)
    findManyUnlinkedForTest (
        @Param('testId') id: string,
    ) {
        return this._adminQuestionService.findManyUnlinkedForTest(id);
    }

    @Get('/unlinked-for-theme/:themeId')
    @UseGuards(HeaderVerifiedUserGuard)
    findManyUnlinkedForTheme (
        @Param('themeId') id: string,
    ) {
        return this._adminQuestionService.findManyUnlinkedForTheme(id);
    }

    @Get('/:id')
    @UseGuards(HeaderVerifiedUserGuard)
    findOneById (
        @Param('id') id: string,
    ) {
        return this._adminQuestionService.findOne(id);
    }


}