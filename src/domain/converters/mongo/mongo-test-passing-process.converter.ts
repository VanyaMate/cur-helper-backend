import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingProcess,
} from '@vanyamate/cur-helper-types';
import {
    IMongoQuestionPassingConverter,
    IMongoTestPassingProcessConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestPassingProcessConverter implements IMongoTestPassingProcessConverter {
    constructor (
        private readonly _questionConverter: IMongoQuestionPassingConverter,
    ) {
    }

    to (from: TestPassingDocument): TestPassingProcess {
        return {
            questions    : from.questions.map(this._questionConverter.to.bind(this._questionConverter)),
            remainingTime: from.startTime - Date.now() + from.test.timeToPass,
        };
    }

    from (to: TestPassingProcess): TestPassingDocument {
        throw new Error('Method not implemented.');
    }
}