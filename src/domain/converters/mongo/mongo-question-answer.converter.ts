import { IConverter } from '@/domain/service.types';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionAnswerType } from '@/domain/services/answer/question-answer.types';


export class MongoQuestionAnswerConverter implements IConverter<QuestionAnswerDocument, QuestionAnswerType> {
    to (from: QuestionAnswerDocument): QuestionAnswerType {
        return {
            id         : from._id.toString(),
            enabled    : from.enabled,
            title      : from.title,
            description: from.description,
            correct    : from.correct,
        };
    }

    from (to: QuestionAnswerType): QuestionAnswerDocument {
        throw new Error('Method not implemented.');
    }
}