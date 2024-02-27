import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { AdminQuestionShortType } from '@vanyamate/cur-helper-types';


export class MongoAdminQuestionShortConverter implements IConverter<QuestionDocument, AdminQuestionShortType> {
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