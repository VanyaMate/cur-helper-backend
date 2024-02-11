import { IConverter } from '@/domain/service.types';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { With } from '@/domain/types';
import {
    QuestionResult,
    QuestionSelect, QuestionThemes,
    QuestionType,
} from '@/domain/services/question/question.types';
import { QuestionAnswerType } from '@/domain/services/answer/question-answer.types';
import {
    TestPassingResultQuestionAnswerProps,
} from '@/domain/converters/mongo/mongo-test-passing-result-question-answer.converter';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeShortType } from '@/domain/services/theme/theme.types';


export class MongoTestPassingResultQuestionConverter implements IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes ]>> {
    constructor (
        private readonly _answerConverter: IConverter<TestPassingResultQuestionAnswerProps, QuestionAnswerType>,
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
    ) {
    }

    to (from: TestPassingQuestionDocument): QuestionSelect & QuestionResult & QuestionThemes & QuestionType {
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