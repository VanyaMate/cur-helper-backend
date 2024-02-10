import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
        @Body() testPassingCreateData: { testPassingId: string },
        @Req() request: Request,
    ) {
        return this._testPassingService.finish(request['user'].id, testPassingCreateData.testPassingId);
    }
}