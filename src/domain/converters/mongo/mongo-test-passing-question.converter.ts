import { IConverter } from '@/domain/service.types';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { With } from '@/domain/types';
import { QuestionSelect, QuestionType } from '@/domain/services/question/question.types';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionAnswerType } from '@/domain/services/answer/question-answer.types';


export class MongoTestPassingQuestionConverter implements IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect ]>> {
    constructor (
        private readonly _testPassingAnswerConverter: IConverter<QuestionAnswerDocument, QuestionAnswerType>,
    ) {
    }

    to (from: TestPassingQuestionDocument): QuestionSelect & QuestionType {
        return {
            id         : from._id.toString(),
            title      : from.question.title,
            description: from.question.description,
            body       : from.question.body,
            complexity : from.question.complexity,
            points     : from.question.points,
            selectId   : from.answerId ? from.answerId.toString() : null,
            answers    : from.question.answers.map((answer) => this._testPassingAnswerConverter.to(answer)),
            enabled    : from.question.enabled,
        };
    }

    from (to: QuestionSelect & QuestionType): TestPassingQuestionDocument {
        throw new Error('Method not implemented.');
    }
}