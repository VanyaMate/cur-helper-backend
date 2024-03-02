import {
    AdminQuestionShortType,
    Filter, MultiplyResponse,
    Options,
    QuestionFullType,
    QuestionType,
} from '@vanyamate/cur-helper-types';


export interface IAdminQuestionsService {
    findOneById (id: string): Promise<QuestionFullType>;

    findMany (filter: Filter<QuestionType>, options: Options<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>>;

    findManyUnlinkedForTest (testId: string, filter: Filter<QuestionType>, options: Options<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>>;

    findManyUnlinkedForTheme (themeId: string, filter: Filter<QuestionType>, options: Options<QuestionType>): Promise<MultiplyResponse<AdminQuestionShortType>>;
}