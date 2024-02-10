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
    TestPassingProcess,
    TestPassingType,
    TestPassingResult,
    TestPassingResults,
    TestPassingTestShort,
    TestPassingThemes,
    TestPassingUserShort,
} from '@/domain/services/test-passing/test-passing.types';


@Injectable()
export class TestPassingService implements ITestPassingService {
    private readonly _testPassingService: ITestPassingService;

    constructor (
        @InjectModel('TestPassingModel') private readonly _testPassingRepository: Model<TestPassingModel>,
        @InjectModel('TestRunningModel') private readonly _testRunningRepository: Model<TestRunningModel>,
        @InjectModel('TestPassingQuestionModel') private readonly _testPassingQuestionRepository: Model<TestPassingQuestionModel>,
        @InjectModel('TestModel') private readonly _testRepository: Model<TestModel>,
    ) {
        this._testPassingService = new MongoTestPassingService(
            this._testPassingRepository,
            this._testRunningRepository,
            this._testPassingQuestionRepository,
            this._testRepository,
        );
    }

    async start (userId: string, testId: string): Promise<TestPassingProcess & TestPassingType> {
        try {
            return await this._testPassingService.start(userId, testId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    finish (userId: string, testId: string): Promise<TestPassingResult & TestPassingType> {
        throw new Error('Method not implemented.');
    }

    setAnswer (userId: string, testId: string, questionId: string, answerId: string): Promise<TestPassingProcess & TestPassingType> {
        throw new Error('Method not implemented.');
    }

    getById (userId: string, testPassingId: string): Promise<TestPassingProcess & TestPassingType> {
        throw new Error('Method not implemented.');
    }

    getResultById (userId: string, testPassingId: string): Promise<TestPassingResults & TestPassingUserShort & TestPassingThemes & TestPassingTestShort & TestPassingType> {
        throw new Error('Method not implemented.');
    }
}