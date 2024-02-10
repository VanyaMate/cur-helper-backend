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


export class MongoTestPassingShortConverter implements IConverter<TestPassingDocument, TestPassingShortInfo> {
    to (from: TestPassingDocument): TestPassingShortInfo {
        return from ? {
            id          : from._id.toString(),
            status      : from.status,
            rightAnswers: from.rightAnswers,
            result      : this._calculateResult(from.rightAnswers, from.test),
            finishTime  : from.finishTime,
            questions   : from.questionsIds?.map((question) => ({ id: question.toString() })) ?? [],
        } : null;
    }

    from (to: TestPassingShortInfo): TestPassingDocument {
        throw new Error('Method not implemented.');
    }

    private _calculateResult (right: number, test: TestDocument): TestPassingResult {
        if (right >= test.perfectScore) {
            return 'perfect';
        } else if (right >= test.satisfactoryScore) {
            return 'satis';
        } else if (right >= test.unsatisfactoryScore) {
            return 'unsatis';
        } else {
            return 'unsatis';
        }
    }
}