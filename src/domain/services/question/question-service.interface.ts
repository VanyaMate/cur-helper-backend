import {
    ICRUD,
    QuestionCreateType,
    QuestionType,
    QuestionUpdateType,
} from '@vanyamate/cur-helper-types';


export interface IQuestionService extends ICRUD<QuestionType, QuestionCreateType, QuestionUpdateType, string> {
}