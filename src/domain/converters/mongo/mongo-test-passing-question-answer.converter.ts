import { IConverter } from '@/domain/service.types';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionAnswerType } from '@vanyamate/cur-helper-types';


export class MongoTestPassingQuestionAnswerConverter implements IConverter<QuestionAnswerDocument, QuestionAnswerType> {
    to (from: QuestionAnswerDocument): QuestionAnswerType {
        return {
            id         : from._id.toString(),
            title      : from.title,
            enabled    : from.enabled,
            description: '',
            correct    : false,
        };
    }

    from (to: QuestionAnswerType): QuestionAnswerDocument {
        throw new Error('Method not implemented.');
    }

}