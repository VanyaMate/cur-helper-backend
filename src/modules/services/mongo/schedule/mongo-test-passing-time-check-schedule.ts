import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestRunningModel } from '@/db/mongoose/test-running/test-running.model';
import { TestPassingModel } from '@/db/mongoose/test-passing/test-passing.model';
import {
    ITestPassingTimeCheckService,
} from '@/domain/services/test-passing-time-check/test-passing-time-check.interface';
import {
    MongoTestPassingTimeCheckService,
} from '@/domain/services/test-passing-time-check/implementations/mongo/mongo-test-passing-time-check-service';


@Injectable()
export class MongoTestPassingTimeCheckSchedule {
    private readonly _checker: ITestPassingTimeCheckService;
    private readonly _logger = new Logger(MongoTestPassingTimeCheckSchedule.name);

    constructor (
        @InjectModel('TestPassingModel') private readonly _testPassingRepository: Model<TestPassingModel>,
        @InjectModel('TestRunningModel') private readonly _testRunningRepository: Model<TestRunningModel>,
    ) {
        this._checker = new MongoTestPassingTimeCheckService(
            this._testRunningRepository,
            this._testPassingRepository,
        );
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    checkTests () {
        this._checker
            .check()
            .then((data) => this._logger.debug(`Update running tests ${ data }`))
            .catch((error) => this._logger.error(`Update running tests ${ error }`));
    }
}