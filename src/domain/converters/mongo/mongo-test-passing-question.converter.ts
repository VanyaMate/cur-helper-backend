import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import {
    IConverter,
    QuestionAnswers,
    QuestionAnswerType,
    QuestionSelect,
    QuestionType, With,
} from '@vanyamate/cur-helper-types';


export class MongoTestPassingQuestionConverter implements IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionAnswers ]>> {
    constructor (
        private readonly _testPassingAnswerConverter: IConverter<QuestionAnswerDocument, QuestionAnswerType>,
    ) {
    }

    to (from: TestPassingQuestionDocument): QuestionSelect & QuestionType & QuestionAnswers {
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