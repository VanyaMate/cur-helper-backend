import {
    IMongoTestConverter, IMongoTestPassingShortConverter,
    IMongoTestWithLatestResultsConverter, MongoTestWithLatestResultsDataType,
} from '@/domain/converters/mongo/mongo-converters.types';
import {
    TestShortResult,
    TestType,
} from '@vanyamate/cur-helper-types';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';


export class MongoTestWithLatestResultConverter implements IMongoTestWithLatestResultsConverter {
    constructor (
        private readonly _testConverter: IMongoTestConverter,
        private readonly _testShortResultConverter: IMongoTestPassingShortConverter,
    ) {
    }

    to (from: MongoTestWithLatestResultsDataType): (TestShortResult & TestType)[] {
        return from.tests.map((test) => {
            const latestResult: TestPassingDocument | null = from.latestResults?.find((result) => result._id.toString() === test._id.toString())?.latestTestResult;
            return {
                ...this._testConverter.to(test),
                shortResult:
                    this._testShortResultConverter.to(
                        latestResult
                        ? Object.assign(latestResult, { test })
                        : null,
                    ),
            };
        });
    }

    from (to: (TestShortResult & TestType)[]): MongoTestWithLatestResultsDataType {
        throw new Error('Method not implemented.');
    }
}