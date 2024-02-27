import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
    QuestionAnswerService,
} from '@/modules/api/v1/question-answer/question-answer.service';


@Controller('/api/v1/question-answer')
export class QuestionAnswerController {
    constructor (
        private readonly _questionAnswerService: QuestionAnswerService,
    ) {
    }

    @Post()
    create (
        @Body() answerCreateDto: any,
    ) {
        return this._questionAnswerService.create(answerCreateDto);
    }

    @Patch()
    update () {

    }

    @Get()
    read () {

    }

    @Delete()
    delete () {

    }
}