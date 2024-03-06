import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { AdminQuestionShortType } from '@vanyamate/cur-helper-types';
import {
    IMongoAdminQuestionShortConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoAdminQuestionShortConverter implements IMongoAdminQuestionShortConverter {
    to (from: QuestionDocument): AdminQuestionShortType {
        return {
            id         : from._id.toString(),
            title      : from.title,
            description: from.description,
            enabled    : from.enabled,
            complexity : from.complexity,
        };
    }

    from (to: AdminQuestionShortType): QuestionDocument {
        throw new Error('Method not implemented.');
    }

}