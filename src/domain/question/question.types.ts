import { With } from '@/domain/types';
import { AnswerResult, AnswerSelect, AnswerWith } from '@/domain/answer/answer.types';


export type QuestionWith<T extends any[]> = With<Question, T>;

export type Question = {
    id: string;
    title: string;
    description: string;
}

export type QuestionAnswers<AnswerType> = {
    answers: AnswerType[];
}

export type QuestionPassing = QuestionWith<[ QuestionAnswers<AnswerWith<[ AnswerSelect ]>> ]>
export type QuestionResult = QuestionWith<[ QuestionAnswers<AnswerWith<[ AnswerSelect, AnswerResult ]>> ]>

export type CreateQuestionType = Pick<Question, 'title'>;
export type UpdateQuestionType =
    Partial<Omit<Question, 'id'>>
    & Partial<{
    answers: string[];
}>;