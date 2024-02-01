import { IConverter } from '@/domain/service.types';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionAnswerType } from '@/domain/answer/question-answer.types';


export class MongoQuestionAnswerConverter implements IConverter<QuestionAnswerDocument, QuestionAnswerType> {
    to (from: QuestionAnswerDocument): QuestionAnswerType {
        return {
            id         : from._id.toString(),
            title      : from.title,
            description: from.description,
            correct    : from.correct,
        };
    }

    from (to: QuestionAnswerType): QuestionAnswerDocument {
        throw new Error('Method not implemented.');
    }
}