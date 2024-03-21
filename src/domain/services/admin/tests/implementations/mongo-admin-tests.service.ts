import {
    IAdminTestsService,
} from '@/domain/services/admin/tests/admin-tests-service.interface';
import {
    AdminTestQuestionsShort,
    Filter,
    Options,
    AdminThemeShortType,
    MultiplyResponse,
    AdminTestThemeShort,
    AdminQuestionShortType,
    TestType,
    AdminTestShortType, IConverter,
} from '@vanyamate/cur-helper-types';
import { FilterQuery, Model } from 'mongoose';
import { TestDocument, TestModel } from '@/db/mongoose/test/test.model';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import {
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';


export class MongoAdminTestsService implements IAdminTestsService {
    constructor (
        private readonly _testRepository: Model<TestModel>,
        private readonly _testToQuestionRepository: Model<QuestionToTestModel>,
        private readonly _testConverter: IConverter<TestDocument, TestType>,
        private readonly _adminTestShortConverter: IConverter<TestDocument, AdminTestShortType>,
        private readonly _adminThemeShortConverter: IConverter<ThemeDocument, AdminThemeShortType>,
        private readonly _adminQuestionShortConverter: IConverter<QuestionDocument, AdminQuestionShortType>,
        private readonly _filterConverter: IConverter<Filter<any>, FilterQuery<any>>,
    ) {
    }

    async getUnlinkedForQuestion (questionId: string, filter: Filter<AdminTestShortType>, options: Options<AdminTestShortType>): Promise<MultiplyResponse<AdminTestShortType>> {
        const linkedTests           = await this._testToQuestionRepository.find({ questionId }).distinct('testId');
        const tests: TestDocument[] = await this._testRepository.find({
            ...this._filterConverter.to(filter), _id: {
                $nin: linkedTests,
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
            list   : tests.map((test) => this._adminTestShortConverter.to(test)),
            count  : tests.length,
            options: {
                limit : options.limit,
                offset: options.offset,
                sort  : [], // TODO: Ну из-за разницы типов тут что-то нужно придумать о.о эх
            },
        };
    }

    async getOneById (id: string): Promise<AdminTestThemeShort & AdminTestQuestionsShort & TestType> {
        const testDocument: TestDocument | null = await this._testRepository.findById(id, {}, {
            populate: [
                {
                    path    : 'questions',
                    populate: {
                        path: 'question',
                    },
                },
                {
                    path: 'theme',
                },
            ],
        });

        if (!testDocument) {
            throw NOT_FOUND;
        }

        return {
            ...this._testConverter.to(testDocument),
            theme    : this._adminThemeShortConverter.to(testDocument.theme),
            questions: testDocument.questions.map(({ question }) => this._adminQuestionShortConverter.to(question)),
        };
    }

    async getList (filter: Filter<AdminTestShortType>, options: Options<AdminTestShortType>): Promise<MultiplyResponse<AdminTestShortType>> {
        const filters: FilterQuery<TestDocument>                   = this._filterConverter.to(filter);
        const [ count, testDocuments ]: [ number, TestDocument[] ] = await Promise.all([
            this._testRepository.countDocuments(filters),
            this._testRepository.find(filters, {}, {
                // TODO: Думаю вынести можно в отдельный конвертер
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
            count,
            options,
            list: testDocuments.map(this._adminTestShortConverter.to.bind(this._adminTestShortConverter)),
        };
    }
}