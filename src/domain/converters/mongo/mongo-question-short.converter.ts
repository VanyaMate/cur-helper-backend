import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionShortType } from '@vanyamate/cur-helper-types';


export class MongoQuestionShortConverter implements IConverter<QuestionDocument, QuestionShortType> {
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