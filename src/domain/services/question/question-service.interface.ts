import { ICRUD } from '@/domain/service.types';
import {
    QuestionCreateType,
    QuestionType,
    QuestionUpdateType,
} from '@/domain/question/question.types';


export interface IQuestionService extends ICRUD<QuestionType, QuestionCreateType, QuestionUpdateType, string> {
}