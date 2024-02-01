import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionType } from '@/domain/question/question.types';
import { QuestionAnswerType } from '@/domain/answer/question-answer.types';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';


export class MongoQuestionConverter implements IConverter<QuestionDocument, QuestionType> {
    constructor (private readonly _mongoQuestionAnswerConverter: IConverter<QuestionAnswerDocument, QuestionAnswerType>) {
    }

    to (from: QuestionDocument): QuestionType {
        return {
            id         : from._id.toString(),
            title      : from.title,
            description: from.description,
            body       : from.body,
            enabled    : from.enabled,
            complexity : from.complexity,
            answers    : from.answers.map(this._mongoQuestionAnswerConverter.to), // TODO: Fix
            points     : from.points,
        };
    }

    from (to: QuestionType): QuestionDocument {
        throw new Error('Method not implemented.');
    }
}