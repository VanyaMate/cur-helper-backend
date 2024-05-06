import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    IMongoTestResultShortConverter, IMongoTestShortConverter,
} from '@/domain/converters/mongo/mongo-converters.types';
import {
    TestResultShortType,
} from '@vanyamate/cur-helper-types';


export class MongoTestResultShortConverter implements IMongoTestResultShortConverter {
    constructor (private readonly _testShortConverter: IMongoTestShortConverter) {
    }

    to (from: TestPassingDocument): TestResultShortType {
        return {
            id             : from.id,
            test           : this._testShortConverter.to(from.test),
            result         : from.result,
            finishTime     : from.finishTime,
            questionsAmount: from.questionsIds.length,
            rightAnswers   : from.rightAnswers,
            status         : from.status,
        };
    }

    from (to: TestResultShortType): TestPassingDocument {
        throw new Error('Method not implemented.');
    }

}