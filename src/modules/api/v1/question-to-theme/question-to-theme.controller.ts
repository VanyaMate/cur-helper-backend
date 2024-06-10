import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import {
    QuestionToThemeService,
} from '@/modules/api/v1/question-to-theme/question-to-theme.service';
import { QuestionToThemeType } from '@vanyamate/cur-helper-types';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/question-to-theme')
export class QuestionToThemeController {
    constructor (private readonly _questionToTestService: QuestionToThemeService) {
    }

    @Post()
    @UseGuards(HeaderVerifiedUserGuard)
    add (@Body() data: QuestionToThemeType) {
        return this._questionToTestService.add(data);
    }

    @Post('/public')
    @UseGuards(HeaderVerifiedUserGuard)
    addByPublicId (@Body() data: QuestionToThemeType) {
        return this._questionToTestService.addByPublicId(data);
    }

    @Delete()
    @UseGuards(HeaderVerifiedUserGuard)
    remove (@Body() data: QuestionToThemeType) {
        return this._questionToTestService.remove(data);
    }
}