import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import { Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { TestDocument } from '@/db/mongoose/test/test.model';
import {
    ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-themes-children.converter';
import { With } from '@/domain/types';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { ObjectId } from 'mongodb';
import {
    TestPassingDocument,
    TestPassingModel,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    QuestionType,
    TestPassingShortInfo,
    TestType,
    ThemeBreadcrumb,
    ThemeChildren,
    ThemeNext,
    ThemePrev,
    ThemeRecursiveChildren,
    ThemeShortType,
    ThemeTestsWithShortResults,
    ThemeType,
} from '@vanyamate/cur-helper-types';


export class MongoPublicThemesService implements IThemesService {
    constructor (
        private readonly _mongoThemeRepository: Model<ThemeModel>,
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _questionConverter: IConverter<QuestionDocument, QuestionType>,
        private readonly _testConverter: IConverter<TestDocument, TestType>,
        private readonly _themeConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _themeRecursiveChildrenConverter: IConverter<ThemeChildrenConverterType, With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>,
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
        private readonly _testShortResult: IConverter<TestPassingDocument, TestPassingShortInfo>,
    ) {
    }

    async getThemeFullDataByPublicId (publicId: string, userId?: string): Promise<ThemeChildren & ThemeTestsWithShortResults & ThemeBreadcrumb & ThemeType & ThemeNext & ThemePrev> {
        const [ theme, childrenThemes, breadcrumbsThemes, nextTheme, prevTheme ] = await Promise.all([
            this._getThemeWithTests(publicId),
            this._getChildrenOfTheme(publicId),
            this._getBreadcrumbOfTheme(publicId),
            this._getNextThemeOf(publicId),
            this._getPrevThemeOf(publicId),
        ]);

        // TODO: Add converter
        if (userId) {
            const latestTestResults = await this._getLatestResultOfTest(theme.tests, userId);

            return {
                ...this._themeConverter.to(theme),
                tests     : theme.tests.map((test) => {
                    const latestResult: TestPassingDocument | null = latestTestResults.find((result) => result._id.toString() === test._id.toString())?.latestTestResult;
                    return {
                        ...this._testConverter.to(test),
                        shortResult:
                            this._testShortResult.to(
                                latestResult
                                ? Object.assign(latestResult, { test })
                                : null,
                            ),
                    };
                }),
                breadcrumb: breadcrumbsThemes.map(this._themeShortConverter.to),
                children  : childrenThemes.map(this._themeShortConverter.to),
                next      : nextTheme ? this._themeShortConverter.to(nextTheme) : null,
                prev      : prevTheme ? this._themeShortConverter.to(prevTheme) : null,
            };
        }

        return {
            ...this._themeConverter.to(theme),
            tests     : theme.tests.map((test) => Object.assign(this._testConverter.to(test), { shortResult: null })),
            breadcrumb: breadcrumbsThemes.map(this._themeShortConverter.to),
            children  : childrenThemes.map(this._themeShortConverter.to),
            next      : nextTheme ? this._themeShortConverter.to(nextTheme) : null,
            prev      : prevTheme ? this._themeShortConverter.to(prevTheme) : null,
        };
    }

    async getThemeListById (publicId: string): Promise<ThemeBreadcrumb & With<ThemeShortType, [ ThemeRecursiveChildren ]>> {
        const childrenDocs: ThemeDocument[] = await this._getThemeWithChildren(publicId);
        const theme: ThemeDocument | null   = childrenDocs.find((child) => child.publicId === publicId);

        if (!childrenDocs.length || !theme) {
            throw NOT_FOUND;
        }

        const breadcrumbs: ThemeDocument[] = await this._getBreadcrumbOfTheme(publicId);

        // TODO: Add converter
        return {
            ...this._themeShortConverter.to(theme),
            breadcrumb: breadcrumbs.map(this._themeShortConverter.to),
            children  : this._themeRecursiveChildrenConverter.to({
                children : childrenDocs,
                currentId: publicId,
            }),
        };
    }

    async getThemesList (): Promise<(ThemeRecursiveChildren & ThemeShortType)[]> {
        const themes: ThemeDocument[]       = await this._getAllThemes();
        const parentThemes: ThemeDocument[] = this._getParentThemesByList(themes);

        // TODO: Add converter
        return parentThemes.map((doc) => ({
            ...this._themeShortConverter.to(doc),
            children: this._themeRecursiveChildrenConverter.to({
                children : themes,
                currentId: doc.publicId,
            }),
        }));
    }

    private _getParentThemesByList (themesList: ThemeDocument[]): ThemeDocument[] {
        return themesList.filter((theme) => theme.publicId.match(/^\d+$/));
    }

    private async _getAllThemes (): Promise<ThemeDocument[]> {
        return this._mongoThemeRepository.find({
            publicId: {
                $regex: /^\d/,
            },
            enabled : true,
        });
    }

    private async _getThemeWithTests (publicId: string): Promise<ThemeDocument> {
        return this._mongoThemeRepository.findOne({ publicId }, {}, {
            populate: [
                {
                    path   : 'tests',
                    options: {
                        limit: 3,
                    },
                    match  : { enabled: true },
                },
            ],
        });
    }

    private async _getThemeWithChildren (publicId: string): Promise<ThemeDocument[]> {
        return this._mongoThemeRepository.find({
            publicId: {
                $regex: new RegExp(`^${publicId}`),
            },
            enabled : true,
        });
    }

    private async _getChildrenOfTheme (publicId: string): Promise<ThemeDocument[]> {
        return this._mongoThemeRepository.find({
            publicId: {
                $regex: new RegExp(`^${publicId}-\\d+$`),
            },
            enabled : true,
        });
    }

    private _getSplittedId (publicId: string): string[] {
        const ids: string[] = publicId.split('-');
        return ids
            .splice(1, ids.length - 1)
            .reduce((acc, id) => {
                acc.push(`${ acc[acc.length - 1] }-${ id }`);
                return acc;
            }, [ ids[0] ]);
    }

    private async _getBreadcrumbOfTheme (publicId: string): Promise<ThemeDocument[]> {
        const parentIds: string[] = this._getSplittedId(publicId);
        return this._mongoThemeRepository.find({
            publicId: {
                $in: parentIds.slice(0, parentIds.length - 1),
            },
        });
    }

    private async _getNextThemeOf (publicId: string): Promise<ThemeDocument> {
        return this._mongoThemeRepository.findOne({
            publicId: {
                $gt: publicId,
            },
            enabled : true,
        }, {}, {
            sort     : {
                publicId: 1,
            },
            collation: {
                locale         : 'en',
                numericOrdering: true,
            },
        });
    }

    private async _getPrevThemeOf (publicId: string): Promise<ThemeDocument> {
        return this._mongoThemeRepository.findOne({
            publicId: {
                $lt: publicId,
            },
            enabled : true,
        }, {}, {
            sort     : {
                publicId: -1,
            },
            collation: {
                locale         : 'en',
                numericOrdering: true,
            },
        });
    }

    private async _getLatestResultOfTest (tests: TestDocument[], userId: string) {
        return this._testPassingRepository.aggregate([
            {
                $match: {
                    testId: { $in: tests.map((test) => test._id) },
                    userId: new ObjectId(userId),
                },
            },
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
    }
}