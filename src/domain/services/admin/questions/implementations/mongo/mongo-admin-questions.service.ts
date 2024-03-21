import {
    IAdminQuestionsService,
} from '@/domain/services/admin/questions/admin-questions-service.interface';
import {
    QuestionType,
    Filter,
    Options,
    MultiplyResponse,
    AdminQuestionShortType,
    IConverter,
    QuestionAnswerType,
    QuestionFullType,
    AdminTestShortType,
    AdminThemeShortType,
} from '@vanyamate/cur-helper-types';
import { FilterQuery, Model } from 'mongoose';
import { QuestionDocument, QuestionModel } from '@/db/mongoose/question/question.model';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import {
    QuestionToTestDocument,
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import {
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';


export class MongoAdminQuestionsService implements IAdminQuestionsService {
    constructor (
        private readonly _questionRepository: Model<QuestionModel>,
        private readonly _questionToTestRepository: Model<QuestionToTestModel>,
        private readonly _questionToThemeRepository: Model<QuestionToThemeModel>,
        private readonly _questionConverter: IConverter<QuestionDocument, QuestionType>,
        private readonly _questionAnswersConverter: IConverter<QuestionAnswerDocument, QuestionAnswerType>,
        private readonly _questionShortConverter: IConverter<QuestionDocument, AdminQuestionShortType>,
        private readonly _themeShortConverter: IConverter<ThemeDocument, AdminThemeShortType>,
        private readonly _testShortConverter: IConverter<TestDocument, AdminTestShortType>,
        private readonly _filterConverter: IConverter<Filter<any>, FilterQuery<any>>,
    ) {
    }

    async findManyUnlinkedForTest (testId: string, filter: Filter<QuestionType>, options: Options<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>> {
        const linkedQuestions               = await this._questionToTestRepository.find({ testId }).distinct('questionId');
        const questions: QuestionDocument[] = await this._questionRepository.find({
            ...this._filterConverter.to(filter), _id: {
                $nin: linkedQuestions,
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
            list   : questions.map((question) => this._questionShortConverter.to(question)),
            count  : questions.length,
            options: {
                limit : options.limit,
                offset: options.offset,
                sort  : [], // TODO: Ну из-за разницы типов тут что-то нужно придумать о.о эх
            },
        };
    }

    async findManyUnlinkedForTheme (themeId: string, filter: Filter<QuestionType>, options: Options<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>> {
        const linkedQuestions               = await this._questionToThemeRepository.find({ themeId }).distinct('questionId');
        const questions: QuestionDocument[] = await this._questionRepository.find({
            ...this._filterConverter.to(filter), _id: {
                $nin: linkedQuestions,
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
            list   : questions.map((question) => this._questionShortConverter.to(question)),
            count  : questions.length,
            options: {
                limit : options.limit,
                offset: options.offset,
                sort  : [], // TODO: Ну из-за разницы типов тут что-то нужно придумать о.о эх
            },
        };
    }

    async findOneById (id: string): Promise<QuestionFullType> {
        const doc: QuestionDocument | null = await this._questionRepository.findById(id, {}, {
            populate: [
                {
                    path    : 'themes',
                    populate: {
                        path: 'theme',
                    },
                },
                {
                    path: 'answers',
                },
                {
                    path    : 'tests',
                    populate: {
                        path: 'test',
                    },
                },
            ],
        });

        if (!doc) {
            throw NOT_FOUND;
        }

        return {
            ...this._questionConverter.to(doc),
            answers: doc.answers.map((answer) => this._questionAnswersConverter.to(answer)),
            themes : doc.themes.map((theme) => this._themeShortConverter.to(theme.theme)),
            tests  : doc.tests.map((test) => this._testShortConverter.to(test.test)),
        };
    }

    async findMany (filter: Filter<QuestionType>, options: Options<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>> {
        const questions: QuestionDocument[] = await this._questionRepository.find(this._filterConverter.to(filter), {}, {
            limit    : options.limit,
            sort     : options.sort ? {
                [options.sort[0]]: options.sort[1] === 'asc' ? 1 : -1,
            } : {},
            skip     : options.offset,
            collation: {
                locale         : 'en',
                numericOrdering: true,
            },
        });

        return {
            list   : questions.map((question) => this._questionShortConverter.to(question)),
            count  : questions.length,
            options: {
                limit : options.limit,
                offset: options.offset,
                sort  : [], // TODO: Ну из-за разницы типов тут что-то нужно придумать о.о эх
            },
        };
    }
}