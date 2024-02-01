import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import {
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import { TestModel } from '@/db/mongoose/test/test.model';
import {
    IQuestionToTestService,
} from '@/domain/services/question-to-test/question-to-test-service.interface';
import {
    MongoQuestionToTestService,
} from '@/domain/services/question-to-test/implementations/mongo/mongo-question-to-test-service';
import {
    QuestionToTestType,
} from '@/domain/services/question-to-test/question-to-test.types';


@Injectable()
export class QuestionToTestService {
    private readonly _questionToTestService: IQuestionToTestService;

    constructor (
        @InjectModel('QuestionModel') private readonly _mongoQuestionRepository: Model<QuestionModel>,
        @InjectModel('TestModel') private readonly _mongoTestRepository: Model<TestModel>,
        @InjectModel('QuestionToTestModel') private readonly _mongoQuestionToTestRepository: Model<QuestionToTestModel>,
    ) {
        this._questionToTestService = new MongoQuestionToTestService(
            this._mongoQuestionRepository,
            this._mongoTestRepository,
            this._mongoQuestionToTestRepository,
        );
    }

    async add (data: QuestionToTestType) {
        try {
            return await this._questionToTestService.addQuestionToTest(data);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async remove (data: QuestionToTestType) {
        try {
            return await this._questionToTestService.removeQuestionFromTest(data);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}