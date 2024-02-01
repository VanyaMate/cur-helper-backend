import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionAnswerType, QuestionType } from '@/domain/question/question.types';


export class MongoQuestionConverter implements IConverter<QuestionDocument, QuestionType> {
    to (from: QuestionDocument): QuestionType {
        return {
            id         : from._id.toString(),
            title      : from.title,
            description: from.description,
            body       : from.body,
            enabled    : from.enabled,
            complexity : from.complexity,
            answers    : from.answers as QuestionAnswerType[], // TODO: Fix
            points     : from.points,
        };
    }

    from (to: QuestionType): QuestionDocument {
        throw new Error('Method not implemented.');
    }
}