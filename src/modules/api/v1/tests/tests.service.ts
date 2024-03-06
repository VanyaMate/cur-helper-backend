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
import { TestModel } from '@/db/mongoose/test/test.model';
import {
    TestQuestionsThemesShort,
    TestShortResult,
    TestThemeShort,
    TestType,
    With,
} from '@vanyamate/cur-helper-types';
import { ErrorCallerService } from '@/modules/services/error/error-caller.service';


@Injectable()
export class TestsService extends MongoTestsService {
    constructor (
        @InjectModel('ThemeModel') readonly themeRepository: Model<ThemeModel>,
        @InjectModel('TestModel') readonly testRepository: Model<TestModel>,
        @InjectModel('TestPassingModel') readonly testPassingRepository: Model<TestPassingModel>,
        readonly converter: MongoConverterService,
        readonly errorCaller: ErrorCallerService,
    ) {
        super(
            errorCaller,
            themeRepository,
            testRepository,
            testPassingRepository,
            converter.testList,
            converter.testFullData,
        );
    }
}