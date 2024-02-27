import { Injectable } from '@nestjs/common';
import {
    IQuestionAnswerService,
} from '@/domain/services/answer/question-answer-service.interface';
import {
    MongoQuestionAnswerService,
} from '@/domain/services/answer/implementations/mongo/mongo-question-answer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionAnswerModel } from '@/db/mongoose/question-answer/question-answer.model';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import {
    Filter,
    QuestionAnswerCreateType,
    QuestionAnswerType, QuestionAnswerUpdateType,
} from '@vanyamate/cur-helper-types';


@Injectable()
export class QuestionAnswerService {
    private readonly _questionAnswerService: IQuestionAnswerService;

    constructor (
        @InjectModel('QuestionAnswerModel') private readonly _questionAnswerRepository: Model<QuestionAnswerModel>,
        private readonly _converter: MongoConverterService,
    ) {
        this._questionAnswerService = new MongoQuestionAnswerService(
            this._questionAnswerRepository,
            this._converter.questionAnswer,
            this._converter.filter,
        );
    }

    async create (data: QuestionAnswerCreateType): Promise<QuestionAnswerType> {
        return this._questionAnswerService.create(data);
    }

    async update (id: string, data: QuestionAnswerUpdateType): Promise<QuestionAnswerType> {
        return this._questionAnswerService.update(id, data);
    }

    async read (filter: Filter<QuestionAnswerType>): Promise<QuestionAnswerType> {
        return this._questionAnswerService.read(filter);
    }

    async delete (id: string): Promise<boolean> {
        return this._questionAnswerService.delete(id);
    }
}