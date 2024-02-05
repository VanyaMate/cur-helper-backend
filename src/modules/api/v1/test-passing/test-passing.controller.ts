import { Body, Controller, Post } from '@nestjs/common';
import { TestPassingService } from '@/modules/api/v1/test-passing/test-passing.service';


@Controller('/api/v1/test-passing')
export class TestPassingController {
    constructor (private readonly _testPassingService: TestPassingService) {
    }

    @Post()
    create (@Body() testPassingCreateData: { userId: string, testId: string }) {
        return this._testPassingService.start(testPassingCreateData.userId, testPassingCreateData.testId);
    }
}