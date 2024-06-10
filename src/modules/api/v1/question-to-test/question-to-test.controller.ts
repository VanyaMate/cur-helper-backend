import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import {
    QuestionToTestService,
} from '@/modules/api/v1/question-to-test/question-to-test.service';
import { QuestionToTestType } from '@vanyamate/cur-helper-types';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/question-to-test')
export class QuestionToTestController {
    constructor (private readonly _questionToTestService: QuestionToTestService) {
    }

    @Post()
    @UseGuards(HeaderVerifiedUserGuard)
    add (@Body() data: QuestionToTestType) {
        return this._questionToTestService.add(data);
    }

    @Delete()
    @UseGuards(HeaderVerifiedUserGuard)
    remove (@Body() data: QuestionToTestType) {
        return this._questionToTestService.remove(data);
    }
}