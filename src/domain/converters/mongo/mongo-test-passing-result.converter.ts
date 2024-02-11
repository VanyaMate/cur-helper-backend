import { IConverter } from '@/domain/service.types';
import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import { TestPassingResults } from '@/domain/services/test-passing/test-passing.types';
import {
    GetTestPassingResult,
} from '@/domain/converters/test-passing-result/test-passing-result.types';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { With } from '@/domain/types';
import {
    QuestionResult,
    QuestionSelect, QuestionThemes,
    QuestionType,
} from '@/domain/services/question/question.types';


export class MongoTestPassingResultConverter implements IConverter<TestPassingDocument, TestPassingResults> {
    constructor (
        private readonly _getTestResult: GetTestPassingResult,
        private readonly _questionConverter: IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes ]>>,
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
