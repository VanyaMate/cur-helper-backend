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
}