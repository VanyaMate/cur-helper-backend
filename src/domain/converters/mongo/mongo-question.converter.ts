import { QuestionDocument } from '@/db/mongoose/question/question.model';
import {
    QuestionType,
} from '@vanyamate/cur-helper-types';
import {
    IMongoQuestionConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoQuestionConverter implements IMongoQuestionConverter {
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