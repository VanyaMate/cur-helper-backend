import { IConverter } from '@/domain/service.types';
import {
    IAdminThemesService,
} from '@/domain/services/admin/themes/admin-themes-service.interface';
import { FilterQuery, Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { ThemeType } from '@/domain/services/theme/theme.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { AdminTestShortType } from '@/domain/services/test/test.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { AdminQuestionShortType } from '@/domain/services/question/question.types';
import {
    ThemeQuestionsShort,
    ThemeTestsShort,
} from '@/domain/services/themes/themes.types';
import {
    AdminThemeShortType,
    Filter,
    MultiplyResponse,
    Options,
} from '@vanyamate/cur-helper-types';
import { NOT_FOUND } from '@/domain/exceptions/errors';


export class MongoAdminThemesService implements IAdminThemesService {
    constructor (
        private readonly _themeRepository: Model<ThemeModel>,
        private readonly _themeConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _adminTestShortConverter: IConverter<TestDocument, AdminTestShortType>,
        private readonly _adminQuestionShortConverter: IConverter<QuestionDocument, AdminQuestionShortType>,
        private readonly _mongoFilterConverter: IConverter<Filter<any>, FilterQuery<any>>,
        private readonly _adminThemeShortConverter: IConverter<ThemeDocument, AdminThemeShortType>,
    ) {
    }

    async getOneTheme (publicId: string): Promise<ThemeQuestionsShort & ThemeTestsShort & ThemeType> {
        const theme: ThemeDocument | null = await this._themeRepository.findOne({ publicId }, {}, {
            populate: [
                {
                    path    : 'questions',
                    populate: {
                        path: 'question',
                    },
                },
                {
                    path: 'tests',
                },
            ],
        });
        if (!theme) {
            throw NOT_FOUND;
        }

        return {
            ...this._themeConverter.to(theme),
            tests    : theme.tests.map(this._adminTestShortConverter.to.bind(this._adminTestShortConverter)),
            questions: theme.questions.map(({ question }) => this._adminQuestionShortConverter.to(question)),
        };
    }

    async getList (filter: Filter<AdminThemeShortType>, options: Options<AdminThemeShortType>): Promise<MultiplyResponse<AdminThemeShortType>> {
        const [ count, themes ]: [ number, ThemeDocument[] ] = await Promise.all([
            this._themeRepository.countDocuments(this._mongoFilterConverter.to(filter)),
            this._themeRepository.find(this._mongoFilterConverter.to(filter), {}, {
                limit    : options.limit,
                sort     : options.sort ? {
                    [options.sort[0]]: options.sort[1] === 'asc' ? 1 : -1,
                } : {},
                skip     : options.offset,
                collation: {
                    locale         : 'en',
                    numericOrdering: true,
                },
            }),
        ]);

        return {
            options: options,
            count  : count,
            list   : themes.map(this._adminThemeShortConverter.to.bind(this._adminThemeShortConverter)),
        };
    }
}