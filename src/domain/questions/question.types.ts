import { AnswerCorrect, AnswerResult, AnswerPassing } from '../answer/answer.types';


/**
 * Основные данные о вопросе
 */
export type Question = {
    id: string;
    title: string;
    description: string;
}

/**
 * Данные о вопросе нужные для прозождения вопроса
 */
export type QuestionPassing =
    {
        answers: AnswerPassing[];
    }
    & Question;

/**
 * Полные данные о вопросе включая правильность и причины ответов.
 */
export type QuestionCorrect =
    {
        answers: AnswerCorrect[];
    }
    & Question;

/**
 * Данные о вопросе нужные для отображения результата.
 */
export type QuestionResult =
    {
        answers: AnswerResult[]
    }
    & Question;