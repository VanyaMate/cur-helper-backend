import { IQuestionService } from '@/domain/question/question-service.interface';
import { Filter, IConverter } from '@/domain/service.types';
import { QuestionCreateType, QuestionType } from '../../question.types';
import { FilterQuery, Model, mongo } from 'mongoose';
import { QuestionDocument, QuestionModel } from '@/db/mongoose/question/question.model';
import { QuestionAnswerModel } from '@/db/mongoose/question-answer/question-answer.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { QuestionAnswerType } from '@/domain/answer/question-answer.types';


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
            if (doc) {
                return this._documentToPublicConverter.to(doc);
            }
            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async update (id: string, data: Partial<QuestionType>): Promise<QuestionType> {
        try {
            const doc: QuestionDocument = await this._questionModelRepository.findOne({ _id: id }, {}, { populate: 'answers' });
            if (doc) {
                await doc.updateOne(data);
                return this._documentToPublicConverter.to(Object.assign(doc, data));
            }
            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async delete (id: string): Promise<boolean> {
        try {
            const doc: QuestionDocument = await this._questionModelRepository.findOne({ _id: id });
            if (doc) {
                await this._questionAnswerModelRepository.deleteMany({
                    _id: {
                        $in: doc.answersIds,
                    },
                });
                return !!(await doc.deleteOne()).deletedCount;
            }
            return false;
        } catch (e) {
            throw e;
        }
    }

}