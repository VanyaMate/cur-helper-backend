import { Filter } from '@/domain/service.types';
import {
    IQuestionAnswerService,
} from '@/domain/services/answer/question-answer-service.interface';
import {
    IConverter,
    QuestionAnswerCreateType,
    QuestionAnswerType,
    QuestionAnswerUpdateType,
} from '@vanyamate/cur-helper-types';
import { FilterQuery, Model } from 'mongoose';
import {
    QuestionAnswerDocument,
    QuestionAnswerModel,
} from '@/db/mongoose/question-answer/question-answer.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';


export class MongoQuestionAnswerService implements IQuestionAnswerService {
    constructor (
        private readonly _questionAnswerRepository: Model<QuestionAnswerModel>,
        private readonly _adminQuestionAnswerConverter: IConverter<QuestionAnswerDocument, QuestionAnswerType>,
        private readonly _filterConverter: IConverter<Filter<any>, FilterQuery<any>>,
    ) {
    }

    async create (data: QuestionAnswerCreateType): Promise<QuestionAnswerType> {
        const doc: QuestionAnswerDocument = await this._questionAnswerRepository.create(data);
        return this._adminQuestionAnswerConverter.to(doc);
    }

    async read (data: Filter<QuestionAnswerType>): Promise<QuestionAnswerType> {
        const doc: QuestionAnswerDocument | null = await this._questionAnswerRepository.findOne(this._filterConverter.to(data));
        if (doc) {
            return this._adminQuestionAnswerConverter.to(doc);
        } else {
            throw NOT_FOUND;
        }
    }

    async update (id: string, data: QuestionAnswerUpdateType): Promise<QuestionAnswerType> {
        const doc: QuestionAnswerDocument | null = await this._questionAnswerRepository.findById(id);
        if (doc) {
            await doc.updateOne(data);
            return this._adminQuestionAnswerConverter.to(Object.assign(doc, data));
        } else {
            throw NOT_FOUND;
        }
    }

    async delete (id: string): Promise<boolean> {
        return !!(await this._questionAnswerRepository.deleteOne({ _id: id })).deletedCount;
    }
}