import { Controller, Get, Param } from '@nestjs/common';
import {
    AdminQuestionsService,
} from '@/modules/api/v1/admin/questions/admin-questions.service';


@Controller('/api/v1/admin/questions')
export class AdminQuestionsController {
    constructor (private readonly _adminQuestionService: AdminQuestionsService) {
    }

    @Get('/list')
    findMany () {
        return this._adminQuestionService.findMany();
    }

    @Get('/unlinked-for-test/:testId')
    findManyUnlinkedForTest (
        @Param('testId') id: string,
    ) {
        return this._adminQuestionService.findManyUnlinkedForTest(id);
    }

    @Get('/unlinked-for-theme/:themeId')
    findManyUnlinkedForTheme (
        @Param('themeId') id: string,
    ) {
        return this._adminQuestionService.findManyUnlinkedForTheme(id);
    }

    @Get('/:id')
    findOneById (
        @Param('id') id: string,
    ) {
        return this._adminQuestionService.findOne(id);
    }


}