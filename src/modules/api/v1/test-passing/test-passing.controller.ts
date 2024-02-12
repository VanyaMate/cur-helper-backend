import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TestPassingService } from '@/modules/api/v1/test-passing/test-passing.service';
import { ForVerifiedUser } from '@/modules/guards/for-verified-user.guard';
import { Request } from 'express';


@Controller('/api/v1/test-passing')
export class TestPassingController {
    constructor (private readonly _testPassingService: TestPassingService) {
    }

    // TODO: Возможно перенести в :params
    @Post()
    // @UseGuards(ForVerifiedUser)
    create (
        @Body() testPassingCreateData: { testId: string },
        @Req() request: Request,
    ) {
        //return this._testPassingService.start(request['user'].id, testPassingCreateData.testId);
        return this._testPassingService.start('65c2dcccbe17e25e6a5205ca', testPassingCreateData.testId);
    }

    @Post('finish')
    // @UseGuards(ForVerifiedUser)
    finish (
        @Body() testPassingFinishData: { testPassingId: string },
        @Req() request: Request,
    ) {
        //return this._testPassingService.finish(request['user'].id, testPassingFinishData.testPassingId);
        return this._testPassingService.finish('65c2dcccbe17e25e6a5205ca', testPassingFinishData.testPassingId);
    }

    @Patch()
    // @UseGuards(ForVerifiedUser)
    setAnswer (
        @Body() testPassingAnswerData: {
            testPassingId: string,
            questionId: string,
            answerId: string
        },
        @Req() request: Request,
    ) {
        return this._testPassingService.setAnswer(
            // request['user'].id,
            '65c2dcccbe17e25e6a5205ca',
            testPassingAnswerData.testPassingId,
            testPassingAnswerData.questionId,
            testPassingAnswerData.answerId,
        );
    }

    @Get('/passing/:id')
    // @UseGuards(ForVerifiedUser)
    getPassingById (
        @Param('id') id: string,
        @Req() request: Request,
    ) {
        // return this._testPassingService.getById(request['user'].id, id);
        return this._testPassingService.getById('65c2dcccbe17e25e6a5205ca', id);
    }

    @Get('/result/:id')
    // @UseGuards(ForVerifiedUser)
    getResultById (
        @Param('id') id: string,
        @Req() request: Request,
    ) {
        // return this._testPassingService.getResultById(request['user'].id, id);
        return this._testPassingService.getResultById('65c2dcccbe17e25e6a5205ca', id);
    }
}