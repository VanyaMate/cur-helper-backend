import { ICRUD } from '@/domain/service.types';
import {
    QuestionAnswerType,
    QuestionAnswerCreateType,
    QuestionAnswerUpdateType,
} from '@vanyamate/cur-helper-types';


export interface IQuestionAnswerService extends ICRUD<QuestionAnswerType, QuestionAnswerCreateType, QuestionAnswerUpdateType, string> {
}