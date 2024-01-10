/**
 * Основные данные об ответе
 */
export type Answer =
    {
        id: string;
        title: string;
    }

/**
 * Данные об ответе нужные для прохождения теста
 */
export type AnswerPassing =
    {
        selected: boolean;
    }
    & Answer;

/**
 * Данные об ответе нужные для показа результата
 */
export type AnswerCorrect =
    {
        reason: string;
        isCorrect: boolean;
    }
    & Answer;

/**
 * Данные об ответе включая правильность и причину ответа.
 */
export type AnswerReason =
    {
        reason: string;
        state: boolean;
    }
    & Answer;

export type AnswerResult =
    AnswerCorrect
    & AnswerPassing;