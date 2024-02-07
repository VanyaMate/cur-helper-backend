import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TestPassingService } from '@/modules/api/v1/test-passing/test-passing.service';
import { AccessGuard } from '@/modules/guards/access.guard';
import { AccessFor } from '@/modules/decorators/access-for.decorator';
import { RIGHTS_VERIFIED_USER } from '@/db/mongoose/rights/rights.types';
import { ForVerifiedUser } from '@/modules/guards/for-verified-user.guard';
import { Request } from 'express';


@Controller('/api/v1/test-passing')
export class TestPassingController {
    constructor (private readonly _testPassingService: TestPassingService) {
    }

    @Post()
    @UseGuards(ForVerifiedUser)
    create (
        @Body() testPassingCreateData: { testId: string },
        @Req() request: Request,
    ) {
        return this._testPassingService.start(request['user'].id, testPassingCreateData.testId);
    }
}