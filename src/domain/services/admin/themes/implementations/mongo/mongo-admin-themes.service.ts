import {
    IAdminThemesService,
} from '@/domain/services/admin/themes/admin-themes-service.interface';
import { Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import {
    AdminQuestionShortType,
    AdminTestShortType,
    AdminThemeShortType,
    Filter, IConverter,
    MultiplyResponse,
    Options, ThemeType,
} from '@vanyamate/cur-helper-types';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { AdminThemeType } from '@vanyamate/cur-helper-types';
import {
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';
import { IMongoFilterConverter } from '@/domain/converters/mongo/mongo-converters.types';


export class MongoAdminThemesService implements IAdminThemesService {
    constructor (
        private readonly _themeRepository: Model<ThemeModel>,
        private readonly _questionRepository: Model<QuestionToThemeModel>,
        private readonly _themeConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _adminTestShortConverter: IConverter<TestDocument, AdminTestShortType>,
        private readonly _adminQuestionShortConverter: IConverter<QuestionDocument, AdminQuestionShortType>,
        private readonly _mongoFilterConverter: IMongoFilterConverter,
        private readonly _adminThemeShortConverter: IConverter<ThemeDocument, AdminThemeShortType>,
    ) {
    }

    async findManyUnlinkedForQuestion (questionId: string, filter: Filter<AdminThemeShortType>, options: Options<AdminThemeShortType>): Promise<MultiplyResponse<AdminThemeShortType>> {
        const linkedThemes            = await this._questionRepository.find({ questionId }).distinct('themeId');
        const themes: ThemeDocument[] = await this._themeRepository.find({
            ...this._mongoFilterConverter.to(filter), _id: {
                $nin: linkedThemes,
            },
        }, {}, {
            limit    : options.limit,
            sort     : options.sort ? {
                [options.sort[0]]: options.sort[1] === 'asc' ? 1 : -1,
            } : {},
            skip     : options.offset,
            collation: {
                locale         : 'en',
                numericOrdering: true,
            },
        }).exec();

        return {
            list   : themes.map((theme) => this._adminThemeShortConverter.to(theme)),
            count  : themes.length,
            options: {
                limit : options.limit,
                offset: options.offset,
                sort  : [], // TODO: Ну из-за разницы типов тут что-то нужно придумать о.о эх
            },
        };
    }

    async getOneTheme (publicId: string): Promise<AdminThemeType> {
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