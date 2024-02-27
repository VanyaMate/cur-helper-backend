import { IConverter } from '@/domain/service.types';
import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { With } from '@/domain/types';
import {
    QuestionAnswers,
    QuestionSelect,
    QuestionType, TestPassingProcess,
} from '@vanyamate/cur-helper-types';


export class MongoTestPassingProcessConverter implements IConverter<TestPassingDocument, TestPassingProcess> {
    constructor (
        private readonly _questionConverter: IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionAnswers ]>>,
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