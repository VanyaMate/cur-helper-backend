import { TestType } from '@/domain/services/test/test.types';
import { ITestsService } from '@/domain/services/tests/tests-service.interface';
import {
    TestQuestionsThemesShort,
    TestShortResult,
    TestThemeShort,
} from '../../tests.types';
import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { TestDocument } from '@/db/mongoose/test/test.model';
import {
    TestPassingDocument,
    TestPassingModel,
} from '@/db/mongoose/test-passing/test-passing.model';
import { IConverter } from '@/domain/service.types';
import {
    TestPassingShortInfo,
} from '@/domain/services/test-passing/test-passing.types';
import { ThemeShortType } from '@/domain/services/theme/theme.types';
import { ThemeTestsWithShortResults } from '@/domain/services/themes/themes.types';


export class MongoTestsService implements ITestsService {
    constructor (
        private readonly _themeRepository: Model<ThemeModel>,
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _testConverter: IConverter<TestDocument, TestType>,
        private readonly _testPassingShortConverter: IConverter<TestPassingDocument, TestPassingShortInfo>,
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
    ) {
    }

    async getTestListByThemeId (themeId: string, userId?: string): Promise<(ThemeTestsWithShortResults & ThemeShortType)[]> {
        const themeDocuments: ThemeDocument[] = await this._themeRepository.find(
            themeId
            ? { publicId: { $regex: new RegExp(`(^${themeId}-)|(^${themeId})$`) } }
            : {}, {}, {
                populate : {
                    path: 'tests',
                },
                sort     : {
                    publicId: 1,
                },
                collation: {
                    locale         : 'en',
                    numericOrdering: true,
                },
            });
        if (!themeDocuments.length) {
            throw NOT_FOUND;
        }
        const testsIds: mongoose.Types.ObjectId[] = themeDocuments.map((theme) => theme.tests).flat(1).map((test) => test._id);
        if (userId) {
            const latestTestResults: {
                _id: ObjectId,
                latestTestResult: TestPassingDocument | null
            }[] = await this._testPassingRepository.aggregate([
                { $match: { testId: { $in: testsIds }, userId: new ObjectId(userId) } },
                { $sort: { testId: 1, startTime: -1 } },
                {
                    $group: {
                        _id             : '$testId',
                        latestTestResult: { $first: '$$ROOT' },
                    },
                },
            ]) as unknown as {
                _id: ObjectId,
                latestTestResult: TestPassingDocument | null
            }[];
            return themeDocuments.map((themeDocument) => ({
                ...this._themeShortConverter.to(themeDocument),
                tests: themeDocument.tests.map((testDocument) => {
                    const latestResult: TestPassingDocument | null = latestTestResults.find((result) => result._id.toString() === testDocument._id.toString()).latestTestResult;
                    return {
                        ...this._testConverter.to(testDocument),
                        shortResult:
                            this._testPassingShortConverter.to(
                                latestResult
                                ? Object.assign(latestResult, { test: testDocument })
                                : null,
                            ),
                    };
                }),
            }));
        }
        return themeDocuments.map((themeDocument) => ({
            ...this._themeShortConverter.to(themeDocument),
            tests: themeDocument.tests.map((testDocument) => ({
                ...this._testConverter.to(testDocument),
                shortResult: null,
            })),
        }));
    }

    async getOneTestByIds (themeId: string, testId: string, userId?: string): Promise<TestType & TestShortResult & TestQuestionsThemesShort & TestThemeShort> {
        const themeDocument: ThemeDocument | null = await this._themeRepository.findOne({
            publicId: themeId,
        }, {}, {
            populate: [
                {
                    path    : 'tests',
                    populate: {
                        path    : 'questions',
                        populate: {
                            path    : 'question',
                            populate: {
                                path    : 'themes',
                                populate: {
                                    path: 'theme',
                                },
                            },
                        },
                    },
                },
            ],
        });
        if (!themeDocument) {
            throw NOT_FOUND;
        }

        const testDocument: TestDocument | null =
                  themeDocument?.tests.length > 1
                  ? themeDocument.tests.find((test) => test._id.toString() === testId)
                  : themeDocument.tests[0];
        if (!testDocument) {
            throw NOT_FOUND;
        }

        if (userId) {
            const testPassings: TestPassingDocument | null = await this._testPassingRepository.findOne({
                userId: userId,
                testId: testDocument._id,
            }, {}, { populate: [ 'questions', 'test' ] }).sort({ finishTime: -1 }).exec();

            // TODO: Delete ctrl c ctrl v
            return {
                ...this._testConverter.to(testDocument),
                shortResult: this._testPassingShortConverter.to(testPassings),
                theme      : this._themeShortConverter.to(themeDocument),
                themes     : testDocument.questions.reduce((acc, question) => {
                    acc = acc.concat(question.question.themes.map((themeToQuestion) => this._themeShortConverter.to(themeToQuestion.theme)));
                    return acc;
                }, []),
            };
        } else {
            return Object.assign(
                this._testConverter.to(testDocument),
                {
                    shortResult: null,
                    theme      : this._themeShortConverter.to(themeDocument),
                    themes     : testDocument.questions.reduce((acc, question) => {
                        acc = acc.concat(question.question.themes.map((themeToQuestion) => this._themeShortConverter.to(themeToQuestion.theme)));
                        return acc;
                    }, []),
                },
            );
        }
    }
}