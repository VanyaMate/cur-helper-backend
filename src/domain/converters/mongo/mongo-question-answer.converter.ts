import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionAnswerType } from '@vanyamate/cur-helper-types';
import {
    IMongoQuestionAnswerConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoQuestionAnswerConverter implements IMongoQuestionAnswerConverter {
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