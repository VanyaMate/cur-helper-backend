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
import { Request } from 'express';
import {
    HeaderVerifiedUserGuard,
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/test-passing')
export class TestPassingController {
    constructor (private readonly _testPassingService: TestPassingService) {
    }

    // TODO: Возможно перенести в :params
    @Post()
    @UseGuards(HeaderVerifiedUserGuard)
    create (
        @Body() testPassingCreateData: { testId: string },
        @Req() request: Request,
    ) {
        return this._testPassingService.start(request['user'].id, testPassingCreateData.testId);
    }

    @Post('finish')
    @UseGuards(HeaderVerifiedUserGuard)
    finish (
        @Body() testPassingFinishData: { testPassingId: string },
        @Req() request: Request,
    ) {
        return this._testPassingService.finish(request['user'].id, testPassingFinishData.testPassingId);
    }

    @Patch()
    @UseGuards(HeaderVerifiedUserGuard)
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
    @UseGuards(HeaderVerifiedUserGuard)
    getPassingById (
        @Param('testPassingId') id: string,
        @Req() request: Request,
    ) {
        return this._testPassingService.getById(request['user'].id, id);
    }

    @Get('result/:testPassingId')
    @UseGuards(HeaderVerifiedUserGuard)
    getResultById (
        @Param('testPassingId') id: string,
        @Req() request: Request,
    ) {
        return this._testPassingService.getResultById(request['user'].id, id);
    }
}