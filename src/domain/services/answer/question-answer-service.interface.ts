import {
    QuestionAnswerType,
    QuestionAnswerCreateType,
    QuestionAnswerUpdateType, ICRUD,
} from '@vanyamate/cur-helper-types';


export interface IQuestionAnswerService extends ICRUD<QuestionAnswerType, QuestionAnswerCreateType, QuestionAnswerUpdateType, string> {
}