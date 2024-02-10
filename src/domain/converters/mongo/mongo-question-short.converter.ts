import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionShortType } from '@/domain/services/question/question.types';


export class MongoQuestionShortConverter implements IConverter<QuestionDocument, QuestionShortType> {
    to (from: QuestionDocument): QuestionShortType {
        throw new Error('Method not implemented.');
    }

    from (to: QuestionShortType): QuestionDocument {
        throw new Error('Method not implemented.');
    }
}