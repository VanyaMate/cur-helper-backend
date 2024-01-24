import { ICRUD } from '@/domain/service.types';
import {
    CreateQuestionType,
    QuestionAnswers,
    QuestionWith, UpdateQuestionType,
} from '@/domain/question/question.types';
import { AnswerResult, AnswerSelect, AnswerWith } from '@/domain/answer/answer.types';


export type QuestionType = QuestionWith<[ QuestionAnswers<AnswerWith<[ AnswerResult ]>> ]>;

export interface IQuestionInterface extends ICRUD<QuestionType, CreateQuestionType, UpdateQuestionType, string> {
    addAnswer (questionId: string, answer: AnswerWith<[ AnswerSelect ]>): Promise<QuestionType>;
}