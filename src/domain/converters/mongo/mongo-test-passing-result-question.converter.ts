import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import {
    TestPassingResultQuestionAnswerProps,
} from '@/domain/converters/mongo/mongo-test-passing-result-question-answer.converter';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import {
    IConverter,
    QuestionAnswers,
    QuestionAnswerType,
    QuestionResult,
    QuestionSelect, QuestionThemes,
    QuestionType, ThemeShortType, With,
} from '@vanyamate/cur-helper-types';


export class MongoTestPassingResultQuestionConverter implements IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes, QuestionAnswers ]>> {
    constructor (
        private readonly _answerConverter: IConverter<TestPassingResultQuestionAnswerProps, QuestionAnswerType>,
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
    ) {
    }

    to (from: TestPassingQuestionDocument): QuestionSelect & QuestionResult & QuestionThemes & QuestionType & QuestionAnswers {
        if (!from.question) {
            return null;
        }

        return {
            id         : from._id.toString(),
            title      : from.question.title,
            description: from.question.description,
            body       : from.question.body,
            complexity : from.question.complexity,
            points     : from.question.points,
            selectId   : from.answerId ? from.answerId.toString() : null,
            answers    : from.question.answers.map((answer) => this._answerConverter.to({
                answer, selectedId: from.answerId?.toString(),
            })),
            enabled    : from.question.enabled,
            timeSpent  : from.timeSpent,
            answerTime : from.answerTime,
            themes     : from.question.themes.map((theme) => this._themeShortConverter.to(theme.theme)),
        };
    }

    from (to: QuestionSelect & QuestionResult & QuestionThemes & QuestionType): TestPassingQuestionDocument {
        throw new Error('Method not implemented.');
    }
}