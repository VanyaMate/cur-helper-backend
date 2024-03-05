import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { IConverter, QuestionAnswerType } from '@vanyamate/cur-helper-types';


export class MongoQuestionAnswerConverter implements IConverter<QuestionAnswerDocument, QuestionAnswerType> {
    to (from: QuestionAnswerDocument): QuestionAnswerType {
        return {
            id         : from._id.toString(),
            enabled    : from.enabled,
            title      : from.title,
            description: from.description,
            correct    : from.correct,
            questionId : from.questionId.toString(),
        };
    }

    from (to: QuestionAnswerType): QuestionAnswerDocument {
        throw new Error('Method not implemented.');
    }
}