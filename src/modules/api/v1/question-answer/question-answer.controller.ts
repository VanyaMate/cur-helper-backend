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

    // TODO: Update to DTO
    @Post()
    create (
        @Body() answerCreateDto: any,
    ) {
        return this._questionAnswerService.create(answerCreateDto);
    }

    @Patch(':id')
    update () {

    }

    @Get()
    read () {

    }

    @Delete()
    delete () {

    }
}