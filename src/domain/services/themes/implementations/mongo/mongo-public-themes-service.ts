import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import {
    ThemeChildren,
    ThemeTests,
    ThemeBreadcrumb,
    ThemeRecursiveChildren, ThemeNext, ThemePrev, ThemeTestsWithShortResults,
} from '../../themes.types';
import { Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { ThemeShortType, ThemeType } from '@/domain/services/theme/theme.types';
import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionType } from '@/domain/services/question/question.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { TestType } from '@/domain/services/test/test.types';
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
import { TestPassingShortInfo } from '@/domain/services/test-passing/test-passing.types';


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
        // TODO: Оптимизация запросов
        // TODO: Оптимизация кода
        const ids: string[]       = publicId.split('-');
        const parentIds: string[] = ids
            .splice(1, ids.length - 1)
            .reduce((acc, id) => {
                acc.push(`${ acc[acc.length - 1] }-${ id }`);
                return acc;
            }, [ ids[0] ]);

        const [ doc, childrenDocs, breadcrumbs ]: [ ThemeDocument, ThemeDocument[], ThemeDocument[] ] = await Promise.all([
            this._mongoThemeRepository.findOne({ publicId }, {}, {
                populate: [
                    {
                        path   : 'tests',
                        options: {
                            limit: 3,
                        },
                    },
                ],
            }),
            this._mongoThemeRepository.find({
                publicId: {
                    $regex: new RegExp(`^${publicId}-\\d+$`),
                },
            }),
            this._mongoThemeRepository.find({
                publicId: {
                    $in: parentIds.slice(0, parentIds.length - 1),
                },
            }),
        ]);

        if (userId) {
            const latestTestResults: {
                _id: ObjectId,
                latestTestResult: TestPassingDocument | null
            }[] = await this._testPassingRepository.aggregate([
                {
                    $match: {
                        testId: { $in: doc.tests.map((test) => test._id) },
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

            return {
                ...this._themeConverter.to(doc),
                tests     : doc.tests.map((test) => {
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
                breadcrumb: breadcrumbs.map(this._themeShortConverter.to),
                children  : childrenDocs.map(this._themeShortConverter.to),
                next      : null,   // TODO: ссылка на 1 дочернюю тему или следующую или после текущего родителя (рекурсивно)
                prev      : null,   // TODO: ссылка на предыдущую тему или родителя
            };
        }

        return {
            ...this._themeConverter.to(doc),
            tests     : doc.tests.map((test) => (Object.assign(this._testConverter.to(test), { shortResult: null }))),
            breadcrumb: breadcrumbs.map(this._themeShortConverter.to),
            children  : childrenDocs.map(this._themeShortConverter.to),
            next      : null,   // TODO: ссылка на 1 дочернюю тему или следующую или после текущего родителя (рекурсивно)
            prev      : null,   // TODO: ссылка на предыдущую тему или родителя
        };
    }

    async getThemeListById (publicId: string): Promise<ThemeBreadcrumb & With<ThemeShortType, [ ThemeRecursiveChildren ]>> {
        const childrenDocs: ThemeDocument[] = await this._mongoThemeRepository.find({
            publicId: {
                $regex: new RegExp(`^${publicId}`),
            },
        });

        const theme: ThemeDocument | null = childrenDocs.find((child) => child.publicId === publicId);

        if (!childrenDocs.length || !theme) {
            throw NOT_FOUND;
        }

        const ids: string[]       = publicId.split('-');
        const parentIds: string[] = ids
            .splice(1, ids.length - 1)
            .reduce((acc, id) => {
                acc.push(`${ acc[acc.length - 1] }-${ id }`);
                return acc;
            }, [ ids[0] ]);

        const breadcrumbs: ThemeDocument[] = await this._mongoThemeRepository.find({
            publicId: {
                $in: parentIds.slice(0, parentIds.length - 1),
            },
        });

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
        const docs: ThemeDocument[]       = await this._mongoThemeRepository.find({
            publicId: {
                $regex: /^\d/,
            },
        });
        const parentDocs: ThemeDocument[] = docs.filter((doc) => doc.publicId.match(/^\d+$/));

        return parentDocs.map((doc) => ({
            ...this._themeShortConverter.to(doc),
            children: this._themeRecursiveChildrenConverter.to({
                children : docs,
                currentId: doc.publicId,
            }),
        }));
    }
}