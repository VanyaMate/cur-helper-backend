import { ITestsService } from '@/domain/services/tests/tests-service.interface';
import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { TestDocument, TestModel } from '@/db/mongoose/test/test.model';
import {
    TestPassingDocument,
    TestPassingModel,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    IErrorCaller, TestListType, TestFullType,
} from '@vanyamate/cur-helper-types';
import {
    LatestTestResultType,
} from '@/domain/services/themes/implementations/mongo/mongo-public-themes-service';
import {
    IMongoTestFullDataConverter,
    IMongoTestListConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestsService implements ITestsService {
    constructor (
        private readonly _errorCaller: IErrorCaller,
        private readonly _themeRepository: Model<ThemeModel>,
        private readonly _testRepository: Model<TestModel>,
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _testListConverter: IMongoTestListConverter,
        private readonly _testFullDataConverter: IMongoTestFullDataConverter,
    ) {
    }

    async getTestListByThemeId (themeId: string, userId?: string): Promise<TestListType[]> {
        const themeDocuments: ThemeDocument[] = await this._getTestListByThemeId(themeId);
        // TODO: Refactor
        if (!themeDocuments.length) {
            throw this._errorCaller.notFound([
                themeId ? {
                    target  : '',
                    messages: [ `Темы с publicId ${ themeId } не найдено` ],
                } : {
                    target  : '',
                    messages: [ 'Не найдено ни одной темы' ],
                },
            ]);
        }
        const testsIds: mongoose.Types.ObjectId[] = this._getTestsObjectIdsByThemeDocuments(themeDocuments);
        const latestTestResults                   = await this._getLatestTestResults(testsIds, userId);

        return this._testListConverter.to({
            themes: themeDocuments, latestTestResults: latestTestResults,
        });
    }

    async getOneTestByIds (testId: string, userId?: string): Promise<TestFullType> {
        const testDocument: TestDocument | null = await this._getFullTestData(testId, userId);

        if (!testDocument) {
            throw this._errorCaller.notFound([
                {
                    target  : '',
                    messages: [ `Теста с id ${ testId } не найдено` ],
                },
            ]);
        }

        const themes                                  = this._getThemesFromTestQuestions(testDocument);
        const testPassing: TestPassingDocument | null = await this._getTestPassing(testDocument._id, userId);

        return this._testFullDataConverter.to({
            test       : testDocument,
            themes     : themes,
            testPassing: testPassing,
        });
    }

    private async _getTestPassing (testId: mongoose.Types.ObjectId, userId?: string): Promise<TestPassingDocument | null> {
        if (!userId) {
            return null;
        }

        return this._testPassingRepository.findOne({
            userId: userId,
            testId: testId,
        }, {}, { populate: [ 'questions', 'test' ] }).sort({ startTime: -1 }).exec();
    }

    private _getThemesFromTestQuestions (test: TestDocument): Map<string, ThemeDocument> {
        const themes = new Map<string, ThemeDocument>();
        for (let i = 0; i < test.questions.length; i++) {
            for (let j = 0; j < test.questions[i].question.themes.length; j++) {
                const theme = test.questions[i].question.themes[j].theme;
                themes.set(theme.publicId, theme);
            }
        }
        return themes;
    }

    private async _getFullTestData (testId: string, userId?: string): Promise<TestDocument | null> {
        return this._testRepository.findOne({
            _id: testId,
        }, {}, {
            populate: [
                {
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
                {
                    path: 'theme',
                },
            ],
        });
    }

    private async _getTestListByThemeId (themeId: string, userId?: string) {
        return this._themeRepository.find(
            themeId
            ? {
                    publicId: { $regex: new RegExp(`(^${themeId}-)|(^${themeId})$`) },
                    enabled : true,
                }
            : { enabled: true }, {}, {
                populate : {
                    path : 'tests',
                    match: {
                        enabled: true,
                    },
                },
                sort     : {
                    publicId: 1,
                },
                collation: {
                    locale         : 'en',
                    numericOrdering: true,
                },
            },
        );
    }

    private async _getLatestTestResults (testsIds: mongoose.Types.ObjectId[], userId?: string): Promise<LatestTestResultType[]> {
        if (!userId) {
            return [];
        }
        return this._testPassingRepository.aggregate([
            { $match: { testId: { $in: testsIds }, userId: new ObjectId(userId) } },
            { $sort: { testId: 1, startTime: -1 } },
            {
                $group: {
                    _id             : '$testId',
                    latestTestResult: { $first: '$$ROOT' },
                },
            },
        ]) as unknown as LatestTestResultType[];
    }

    private _getTestsObjectIdsByThemeDocuments (themeDocuments: ThemeDocument[]): mongoose.Types.ObjectId[] {
        return themeDocuments.map((theme) => theme.tests).flat(1).map((test) => test._id);
    }
}