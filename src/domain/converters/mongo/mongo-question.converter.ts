import { QuestionDocument } from '@/db/mongoose/question/question.model';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import {
    IConverter,
    QuestionAnswerType,
    QuestionType,
} from '@vanyamate/cur-helper-types';


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
            points     : from.points,
        };
    }

    from (to: QuestionType): QuestionDocument {
        throw new Error('Method not implemented.');
    }
}