import { ICRUD } from '@/domain/service.types';
import {
    QuestionCreateType,
    QuestionType,
    QuestionUpdateType,
} from '@vanyamate/cur-helper-types';


export interface IQuestionService extends ICRUD<QuestionType, QuestionCreateType, QuestionUpdateType, string> {
}