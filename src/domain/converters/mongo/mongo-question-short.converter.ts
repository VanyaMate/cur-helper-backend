import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionShortType } from '@vanyamate/cur-helper-types';
import {
    IMongoQuestionShortConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoQuestionShortConverter implements IMongoQuestionShortConverter {
    to (from: QuestionDocument): QuestionShortType {
        return {
            id         : from._id.toString(),
            title      : from.title,
            description: from.description,
            complexity : from.complexity,
        };
    }

    from (to: QuestionShortType): QuestionDocument {
        throw new Error('Method not implemented.');
    }
}