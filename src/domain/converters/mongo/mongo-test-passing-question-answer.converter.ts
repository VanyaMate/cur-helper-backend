import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { IConverter, QuestionAnswerType } from '@vanyamate/cur-helper-types';
import {
    IMongoQuestionAnswerPassingConverter,
    IMongoTestPassingConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestPassingQuestionAnswerConverter implements IMongoQuestionAnswerPassingConverter {
    to (from: QuestionAnswerDocument): QuestionAnswerType {
        return {
            id         : from._id.toString(),
            title      : from.title,
            enabled    : from.enabled,
            description: '',
            correct    : false,
            questionId : from.questionId.toString(),
        };
    }

    from (to: QuestionAnswerType): QuestionAnswerDocument {
        throw new Error('Method not implemented.');
    }

}