import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingResults,
} from '@vanyamate/cur-helper-types';
import {
    IMongoTestResultConverter, IMongoTestResultQuestionConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestPassingResultConverter implements IMongoTestResultConverter {
    constructor (
        private readonly _questionConverter: IMongoTestResultQuestionConverter,
    ) {
    }

    to (from: TestPassingDocument): TestPassingResults {
        return {
            questions   : from.questions.map(this._questionConverter.to.bind(this._questionConverter)),
            result      : from.result,
            finishTime  : from.finishTime,
            rightAnswers: from.rightAnswers,
        };
    }

    from (to: TestPassingResults): TestPassingDocument {
        throw new Error('Method not implemented.');
    }
}
