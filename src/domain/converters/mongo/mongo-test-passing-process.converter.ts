import { IConverter } from '@/domain/service.types';
import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import { TestPassingProcess } from '@/domain/services/test-passing/test-passing.types';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { With } from '@/domain/types';
import { QuestionSelect, QuestionType } from '@/domain/services/question/question.types';


export class MongoTestPassingProcessConverter implements IConverter<TestPassingDocument, TestPassingProcess> {
    constructor (
        private readonly _questionConverter: IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect ]>>,
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