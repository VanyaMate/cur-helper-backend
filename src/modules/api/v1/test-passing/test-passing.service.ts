import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestPassingModel } from '@/db/mongoose/test-passing/test-passing.model';
import { TestRunningModel } from '@/db/mongoose/test-running/test-running.model';
import {
    TestPassingQuestionModel,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { TestModel } from '@/db/mongoose/test/test.model';
import {
    ITestPassingService,
} from '@/domain/services/test-passing/test-passing-service.interface';
import {
    MongoTestPassingService,
} from '@/domain/services/test-passing/implementations/mongo/mongo-test-passing.service';
import {
    getTestPassingResult,
} from '@/domain/converters/test-passing-result/implementations/getTestPassingResult';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import { TestPassingProcess, TestPassingType, TestPassingTestShort, TestPassingThemes, TestPassingUserShort, TestPassingResults } from '@vanyamate/cur-helper-types';


@Injectable()
export class TestPassingService implements ITestPassingService {
    private readonly _testPassingService: ITestPassingService;

    constructor (
        @InjectModel('TestPassingModel') private readonly _testPassingRepository: Model<TestPassingModel>,
        @InjectModel('TestRunningModel') private readonly _testRunningRepository: Model<TestRunningModel>,
        @InjectModel('TestPassingQuestionModel') private readonly _testPassingQuestionRepository: Model<TestPassingQuestionModel>,
        @InjectModel('TestModel') private readonly _testRepository: Model<TestModel>,
        public readonly _converter: MongoConverterService,
    ) {
        this._testPassingService = new MongoTestPassingService(
            this._testPassingRepository,
            this._testRunningRepository,
            this._testPassingQuestionRepository,
            this._testRepository,
            this._converter.testPassing,
            this._converter.testPassingProcess,
            this._converter.testResult,
            this._converter.test,
            this._converter.user,
            this._converter.themeShort,
            getTestPassingResult,
        );
    }

    async start (userId: string, testId: string): Promise<TestPassingProcess & TestPassingType> {
        try {
            return await this._testPassingService.start(userId, testId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
c
    async finish (userId: string, testPassingId: string): Promise<TestPassingResults & TestPassingUserShort & TestPassingThemes & TestPassingTestShort & TestPassingType> {
        try {
            return await this._testPassingService.finish(userId, testPassingId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async setAnswer (userId: string, testPassingId: string, questionId: string, answerId: string): Promise<boolean> {
        try {
            return await this._testPassingService.setAnswer(userId, testPassingId, questionId, answerId);
        } catch (e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getById (userId: string, testPassingId: string): Promise<TestPassingProcess & TestPassingType> {
        try {
            return await this._testPassingService.getById(userId, testPassingId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getResultById (userId: string, testPassingId: string): Promise<TestPassingResults & TestPassingUserShort & TestPassingThemes & TestPassingTestShort & TestPassingType> {
        try {
            return await this._testPassingService.getResultById(userId, testPassingId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}