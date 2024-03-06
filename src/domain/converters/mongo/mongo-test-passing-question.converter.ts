import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import {
    QuestionAnswers,
    QuestionSelect,
    QuestionType,
} from '@vanyamate/cur-helper-types';
import {
    IMongoQuestionAnswerPassingConverter,
    IMongoQuestionPassingConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestPassingQuestionConverter implements IMongoQuestionPassingConverter {
    constructor (
        private readonly _testPassingAnswerConverter: IMongoQuestionAnswerPassingConverter,
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

    from (to: QuestionSelect & QuestionType & QuestionAnswers): TestPassingQuestionDocument {
        throw new Error('Method not implemented.');
    }
}