import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import { QuestionAnswerModel } from '@/db/mongoose/question-answer/question-answer.model';
import {
    MongoFilterConverterService,
} from '@/modules/services/mongo/mongo-filter-converter.service';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import { IQuestionService } from '@/domain/services/question/question-service.interface';
import {
    MongoQuestionService
} from '@/domain/services/question/implementations/mongo/mongo-question-service';
import {
    MongoQuestionConverter
} from '@/domain/services/question/implementations/mongo/mongo-question.converter';
import {
    MongoQuestionAnswerConverter
} from '@/domain/services/answer/implementations/mongo/mongo-question-answer.converter';
import {
    QuestionCreateType,
    QuestionUpdateType,
} from '@/domain/services/question/question.types';
import { QuestionCreateDto } from '@/domain/services/question/dto/question-create.dto';
import { QuestionUpdateDto } from '@/domain/services/question/dto/question-update.dto';


@Injectable()
export class QuestionService {
    private readonly _questionService: IQuestionService;

    constructor (
        @InjectModel('QuestionModel') private readonly _questionModelRepository: Model<QuestionModel>,
        @InjectModel('QuestionAnswerModel') private readonly _questionAnswerModelRepository: Model<QuestionAnswerModel>,
        private readonly _filterMongoConverter: MongoFilterConverterService,
        private readonly _dtoValidator: DtoValidatorService,
    ) {
        this._questionService = new MongoQuestionService(
            this._questionModelRepository,
            this._questionAnswerModelRepository,
            new MongoQuestionConverter(new MongoQuestionAnswerConverter()),
            this._filterMongoConverter,
        );
    }

    async create (createData: QuestionCreateType) {
        try {
            await this._dtoValidator.validate(new QuestionCreateDto(createData));
            return await this._questionService.create(createData);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getById (id: string) {
        try {
            return await this._questionService.read({ id: { value: id, type: 'equal' } });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async updateById (id: string, updateData: QuestionUpdateType) {
        try {
            await this._dtoValidator.validate(new QuestionUpdateDto(updateData));
            return await this._questionService.update(id, updateData);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteById (id: string) {
        try {
            return await this._questionService.delete(id);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}