import { TestType, TestShortType } from '@/domain/services/test/test.types';
import { ITestsService } from '@/domain/services/tests/tests-service.interface';
import { TestChildrenWithResults, TestShortResult } from '../../tests.types';
import { Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { TestDocument } from '@/db/mongoose/test/test.model';
import {
    TestPassingDocument,
    TestPassingModel,
} from '@/db/mongoose/test-passing/test-passing.model';
import { IConverter } from '@/domain/service.types';
import { TestPassingResult } from '@/domain/services/test-passing/test-passing.types';


export class MongoTestsService implements ITestsService {
    constructor (
        private readonly _themeRepository: Model<ThemeModel>,
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _testConverter: IConverter<TestDocument, TestType>,
    ) {
    }

    async getById (themeId: string, testId: string, userId?: string): Promise<TestType & TestShortResult> {
        const themeDocument: ThemeDocument | null = await this._themeRepository.findOne({
            publicId: themeId,
        }, {}, {
            populate: [
                {
                    path: 'tests',
                },
            ],
        });
        if (!themeDocument) {
            throw NOT_FOUND;
        }

        const testDocument: TestDocument | null = themeDocument.tests.find((test) => test._id.toString() === testId);
        if (!testDocument) {
            throw NOT_FOUND;
        }

        if (userId) {
            const testPassings: TestPassingDocument | null = await this._testPassingRepository.findOne({
                userId: userId,
                testId: testDocument._id,
            }, {}, { populate: [ 'questions', 'test' ] }).sort({ finishTime: -1 }).exec();

            const calc = function (right: number, test: TestDocument): TestPassingResult {
                if (right >= test.perfectScore) {
                    return 'perfect';
                } else if (right >= test.satisfactoryScore) {
                    return 'satis';
                } else if (right >= test.unsatisfactoryScore) {
                    return 'unsatis';
                } else {
                    return 'unsatis';
                }
            };

            return {
                ...this._testConverter.to(testDocument),
                shortResult: testPassings ? {
                    id          : testPassings._id.toString(),
                    status      : testPassings.status,
                    rightAnswers: testPassings.rightAnswers,
                    result      : calc(testPassings.rightAnswers, testPassings.test),
                    finishTime  : testPassings.finishTime,
                    questions   : testPassings.questions?.map((question) => ({
                        id: question._id.toString(),
                    })) ?? [],
                } : null,
            };
        } else {
            return Object.assign(this._testConverter.to(testDocument), { shortResult: null });
        }
    }

    async getListById (themeId: string, userId?: string): Promise<TestChildrenWithResults & TestShortResult & TestShortType> {
        throw new Error('Method not implemented.');
    }
}