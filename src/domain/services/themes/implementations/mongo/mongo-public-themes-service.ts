import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import { Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { IConverter } from '@/domain/service.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { ObjectId } from 'mongodb';
import {
    TestPassingDocument,
    TestPassingModel,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    ThemeChildrenType, ThemeFullType, ThemeRecursiveType,
} from '@vanyamate/cur-helper-types';
import {
    ThemeFullTypeConverterDocumentsType,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-full-type.converter';
import {
    ThemeListByIdConverterDocumentsType,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-children.converter';
import {
    ThemeListConverterDocumentsType,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-recursive.converter';


export type LatestTestResultType = {
    _id: ObjectId,
    latestTestResult: TestPassingDocument | null
};

export class MongoPublicThemesService implements IThemesService {
    constructor (
        private readonly _themeRepository: Model<ThemeModel>,
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _themeFullConverter: IConverter<ThemeFullTypeConverterDocumentsType, ThemeFullType>,
        private readonly _themeChildrenConverter: IConverter<ThemeListByIdConverterDocumentsType, ThemeChildrenType>,
        private readonly _themeRecursiveConverter: IConverter<ThemeListConverterDocumentsType, ThemeRecursiveType[]>,
    ) {
    }

    async getThemeFullDataByPublicId (publicId: string, userId?: string): Promise<ThemeFullType> {
        const [ theme, children, breadcrumb, nextTheme, prevTheme ] = await Promise.all([
            this._getThemeWithTests(publicId),
            this._getChildrenOfTheme(publicId),
            this._getBreadcrumbOfTheme(publicId),
            this._getNextThemeOf(publicId),
            this._getPrevThemeOf(publicId),
        ]);

        const latestTestResults = await this._getLatestResultOfTest(theme.tests, userId);

        return this._themeFullConverter.to({
            theme, children, prevTheme, nextTheme, breadcrumb, latestTestResults,
        });
    }

    async getThemeListById (publicId: string): Promise<ThemeChildrenType> {
        const [ children, breadcrumb ]    = await Promise.all([
            this._getThemeWithChildren(publicId),
            this._getBreadcrumbOfTheme(publicId),
        ]);
        const theme: ThemeDocument | null = children.find((child) => child.publicId === publicId);

        if (!children.length || !theme) {
            throw NOT_FOUND;
        }

        return this._themeChildrenConverter.to({ children, theme, breadcrumb });
    }

    async getThemesList (): Promise<ThemeRecursiveType[]> {
        const themes: ThemeDocument[]       = await this._getAllThemes();
        const parentThemes: ThemeDocument[] = this._getParentThemesByList(themes);

        return this._themeRecursiveConverter.to({ themes, parentThemes });
    }

    private _getParentThemesByList (themesList: ThemeDocument[]): ThemeDocument[] {
        return themesList.filter((theme) => theme.publicId.match(/^\d+$/));
    }

    private async _getAllThemes (): Promise<ThemeDocument[]> {
        return this._themeRepository.find({
            publicId: {
                $regex: /^\d/,
            },
            enabled : true,
        });
    }

    private async _getThemeWithTests (publicId: string): Promise<ThemeDocument> {
        return this._themeRepository.findOne({ publicId }, {}, {
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
        return this._themeRepository.find({
            publicId: {
                $regex: new RegExp(`^${publicId}`),
            },
            enabled : true,
        });
    }

    private async _getChildrenOfTheme (publicId: string): Promise<ThemeDocument[]> {
        return this._themeRepository.find({
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
        return this._themeRepository.find({
            publicId: {
                $in: parentIds.slice(0, parentIds.length - 1),
            },
        });
    }

    private async _getNextThemeOf (publicId: string): Promise<ThemeDocument> {
        return this._themeRepository.findOne({
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
        return this._themeRepository.findOne({
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

    private async _getLatestResultOfTest (tests: TestDocument[], userId: string): Promise<LatestTestResultType[] | null> {
        return userId ? this._testPassingRepository.aggregate([
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
        ]) as unknown as LatestTestResultType[] : null;
    }
}