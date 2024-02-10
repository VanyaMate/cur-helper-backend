import {
    ITestPassingTimeCheckService,
} from '@/domain/services/test-passing-time-check/test-passing-time-check.interface';
import { Model } from 'mongoose';
import {
    TestRunningDocument,
    TestRunningModel,
} from '@/db/mongoose/test-running/test-running.model';
import {
    ITestPassingService,
} from '@/domain/services/test-passing/test-passing-service.interface';


export class MongoTestPassingTimeCheckService implements ITestPassingTimeCheckService {
    constructor (
        private readonly _testPassingRunningRepository: Model<TestRunningModel>,
        // TODO: Мб функцию только?
        private readonly _testPassingService: ITestPassingService,
    ) {
    }

    async check () {
        const runningTests: TestRunningDocument[] = await this._testPassingRunningRepository.find({
            finishTime: {
                $lt: Date.now(),
            },
        });
        await Promise.all(runningTests.map((test) => this._testPassingService.finish(test.userId.toString(), test.testPassingId.toString())));
        await this._testPassingRunningRepository.deleteMany({
            _id: {
                $in: runningTests.map((test) => test._id),
            },
        });

        return runningTests.length;
    }
}