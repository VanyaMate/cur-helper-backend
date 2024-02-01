import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
    QuestionToTestService,
} from '@/modules/api/v1/question-to-test/question-to-test.service';
import {
    QuestionToTestType,
} from '@/domain/services/question-to-test/question-to-test.types';


@Controller('/api/v1/question-to-test')
export class QuestionToTestController {
    constructor (private readonly _questionToTestService: QuestionToTestService) {
    }

    @Post()
    add (@Body() data: QuestionToTestType) {
        return this._questionToTestService.add(data);
    }

    @Delete()
    remove (@Body() data: QuestionToTestType) {
        return this._questionToTestService.remove(data);
    }
}