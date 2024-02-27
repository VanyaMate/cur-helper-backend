import { IConverter } from '@/domain/service.types';
import {
    GetTestPassingResult,
} from '@/domain/converters/test-passing-result/test-passing-result.types';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';
import { TestPassingShortInfo } from '@vanyamate/cur-helper-types';


export class MongoTestPassingShortConverter implements IConverter<TestPassingDocument, TestPassingShortInfo> {
    constructor (
        private readonly _resultGetter: GetTestPassingResult,
    ) {
    }

    to (from: TestPassingDocument): TestPassingShortInfo {
        return from ? {
            id             : from._id.toString(),
            status         : from.status,
            rightAnswers   : from.rightAnswers,
            result         : this._resultGetter(from.rightAnswers, {
                perfect: from.test.perfectScore,
                satis  : from.test.satisfactoryScore,
                unsatis: from.test.unsatisfactoryScore,
            }),
            finishTime     : from.finishTime,
            questionsAmount: from.questionsIds.length,
        } : null;
    }

    from (to: TestPassingShortInfo): TestPassingDocument {
        throw new Error('Method not implemented.');
    }
}