import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITestsService } from '@/domain/services/tests/tests-service.interface';
import {
    MongoTestsService,
} from '@/domain/services/tests/implementations/mongo/mongo-tests.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { TestPassingModel } from '@/db/mongoose/test-passing/test-passing.model';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import { TestType } from '@/domain/services/test/test.types';
import { TestShortResult } from '@/domain/services/tests/tests.types';


@Injectable()
export class TestsService {
    private readonly _testsService: ITestsService;

    constructor (
        @InjectModel('ThemeModel') private readonly _themeRepository: Model<ThemeModel>,
        @InjectModel('TestPassingModel') private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _converter: MongoConverterService,
    ) {
        this._testsService = new MongoTestsService(
            this._themeRepository,
            this._testPassingRepository,
            this._converter.test,
            this._converter.testPassingShort,
            this._converter.themeShort,
        );
    }

    async getById (themeId: string, testId: string, userId?: string): Promise<TestType & TestShortResult> {
        try {
            return await this._testsService.getOneTestByIds(themeId, testId, userId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getListById (themeId: string, userId?: string) {
        try {
            return await this._testsService.getTestListByThemeId(themeId, userId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}