import { IConverter } from '@/domain/service.types';
import {
    TestPassingDocument,
    TestPassingModel,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingResult,
    TestPassingShortInfo,
} from '@/domain/services/test-passing/test-passing.types';
import { Document, Types } from 'mongoose';
import { TestDocument } from '@/db/mongoose/test/test.model';
import {
    GetTestPassingResult,
} from '@/domain/converters/test-passing-result/test-passing-result.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionShortType } from '@/domain/services/question/question.types';


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