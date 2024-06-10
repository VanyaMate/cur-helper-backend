import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    QuestionAnswerService,
} from '@/modules/api/v1/question-answer/question-answer.service';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/question-answer')
export class QuestionAnswerController {
    constructor (
        private readonly _questionAnswerService: QuestionAnswerService,
    ) {
    }

    // TODO: Update to DTO
    @Post()
    @UseGuards(HeaderVerifiedUserGuard)
    create (
        @Body() answerCreateDto: any,
    ) {
        return this._questionAnswerService.create(answerCreateDto);
    }

    @Patch(':id')
    @UseGuards(HeaderVerifiedUserGuard)
    update (
        @Param('id') id: string,
        @Body() answerUpdateDto: any,
    ) {
        return this._questionAnswerService.update(id, answerUpdateDto);
    }

    @Delete(':id')
    @UseGuards(HeaderVerifiedUserGuard)
    delete () {

    }
}