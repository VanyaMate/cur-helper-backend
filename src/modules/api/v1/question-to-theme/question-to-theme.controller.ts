import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
    QuestionToThemeService,
} from '@/modules/api/v1/question-to-theme/question-to-theme.service';
import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


@Controller('/api/v1/question-to-theme')
export class QuestionToThemeController {
    constructor (private readonly _questionToTestService: QuestionToThemeService) {
    }

    @Post()
    add (@Body() data: QuestionToThemeType) {
        return this._questionToTestService.add(data);
    }

    @Post('/public')
    addByPublicId (@Body() data: QuestionToThemeType) {
        return this._questionToTestService.addByPublicId(data);
    }

    @Delete()
    remove (@Body() data: QuestionToThemeType) {
        return this._questionToTestService.remove(data);
    }
}