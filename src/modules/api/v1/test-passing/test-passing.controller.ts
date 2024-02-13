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
    @UseGuards(ForVerifiedUser)
    create (
        @Body() testPassingCreateData: { testId: string },
        @Req() request: Request,
    ) {
        return this._testPassingService.start(request['user'].id, testPassingCreateData.testId);
    }

    @Post('finish')
    @UseGuards(ForVerifiedUser)
    finish (
        @Body() testPassingFinishData: { testPassingId: string },
        @Req() request: Request,
    ) {
        return this._testPassingService.finish(request['user'].id, testPassingFinishData.testPassingId);
    }

    @Patch()
    @UseGuards(ForVerifiedUser)
    setAnswer (
        @Body() testPassingAnswerData: {
            testPassingId: string,
            questionId: string,
            answerId: string
        },
        @Req() request: Request,
    ) {
        return this._testPassingService.setAnswer(
            request['user'].id,
            testPassingAnswerData.testPassingId,
            testPassingAnswerData.questionId,
            testPassingAnswerData.answerId,
        );
    }

    @Get('passing/:testPassingId')
    @UseGuards(ForVerifiedUser)
    getPassingById (
        @Param('testPassingId') id: string,
        @Req() request: Request,
    ) {
        return this._testPassingService.getById(request['user'].id, id);
    }

    @Get('result/:testPassingId')
    @UseGuards(ForVerifiedUser)
    getResultById (
        @Param('testPassingId') id: string,
        @Req() request: Request,
    ) {
        return this._testPassingService.getResultById(request['user'].id, id);
    }
}