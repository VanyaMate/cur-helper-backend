import {
    ITestPassingTimeCheckService,
} from '@/domain/services/test-passing-time-check/test-passing-time-check.interface';
import { Model, UpdateWriteOpResult } from 'mongoose';
import {
    TestRunningDocument,
    TestRunningModel,
} from '@/db/mongoose/test-running/test-running.model';
import { TestPassingModel } from '@/db/mongoose/test-passing/test-passing.model';
import { Status } from '@/domain/enums';
import { TestPassingState } from '@/domain/services/test-passing/test-passing.types';


export class MongoTestPassingTimeCheckService implements ITestPassingTimeCheckService {
    constructor (
        private readonly _testPassingRunningRepository: Model<TestRunningModel>,
        private readonly _testPassingRepository: Model<TestPassingModel>,
    ) {
    }

    async check () {
        const runningTests: TestRunningDocument[] = await this._testPassingRunningRepository.find({
            finishTime: {
                $lt: Date.now(),
            },
        });
        const updated: UpdateWriteOpResult        = await this._testPassingRepository.updateMany({
            _id: {
                $in: runningTests.map((test) => test.testPassingId),
            },
        }, {
            finishTime: Date.now(),
            status    : 'finished' as TestPassingState,
        });
        await this._testPassingRunningRepository.deleteMany({
            _id: {
                $in: runningTests.map((test) => test._id),
            },
        });

        return updated.matchedCount;
    }
}