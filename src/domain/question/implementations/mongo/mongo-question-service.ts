import { IQuestionService } from '@/domain/question/question-service.interface';
import { Filter, IConverter } from '@/domain/service.types';
import { QuestionCreateType, QuestionType } from '../../question.types';
import { FilterQuery, Model } from 'mongoose';
import { QuestionDocument, QuestionModel } from '@/db/mongoose/question/question.model';
import { QuestionAnswerModel } from '@/db/mongoose/question-answer/question-answer.model';


export class MongoQuestionService implements IQuestionService {
    constructor (
        private readonly _questionModelRepository: Model<QuestionModel>,
        private readonly _questionAnswerModelRepository: Model<QuestionAnswerModel>,
        private readonly _documentToPublicConverter: IConverter<QuestionDocument, QuestionType>,
        private readonly _filterMongoConverter: IConverter<Filter<QuestionType>, FilterQuery<QuestionModel>>,
    ) {
    }

    async create (data: QuestionCreateType): Promise<QuestionType> {
        try {
            const answersDocs: QuestionAnswerModel[] = await this._questionAnswerModelRepository.create(data.answers);
            const doc: QuestionDocument              = await this._questionModelRepository.create({
                ...data, answersIds: answersDocs,
            });
            return this._documentToPublicConverter.to(Object.assign(doc, { answers: answersDocs }));
        } catch (e) {
            throw e;
        }
    }

    async read (data: Filter<QuestionType>): Promise<QuestionType> {
        try {
            const doc: QuestionDocument = await this._questionModelRepository.findOne(this._filterMongoConverter.to(data), {}, { populate: 'answers' });
            return this._documentToPublicConverter.to(doc);
        } catch (e) {
            throw e;
        }
    }

    update (id: string, data: Partial<QuestionType>): Promise<QuestionType> {
        throw new Error('Method not implemented.');
    }

    delete (id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}