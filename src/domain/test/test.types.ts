import { QuestionPassing, QuestionResult } from '../questions/question.types';


/**
 * Статус теста
 */
export type TestStatus =
    'not-started'
    | 'process'
    | 'unsatisfactory'
    | 'satisfactorily'
    | 'perfect';

/**
 * Основные данные о тесте
 */
export type Test = {
    id: string;
    title: string;
    description: string;
    timeToPass: number;
}

/**
 * Показывает статус теста
 */
export type TestPassingData =
    {
        status: TestStatus;
        startTime: string;
    }
    & Test;

/**
 * Показывает результаты и статус теста
 * @number rightAnswers - Количество правильных ответов. Если тест находится в process - возвращается -1
 * @number questions - Количество вопросов в тесте.
 * @number timeSpent - Количество времени в миллисекундах которое осталось до завершения теста. Если тест закончился - возвращается 0.
 * @string finishTime - Дата когда тест закончился. Если тест находится в process - возвращается пустая строка.
 */
export type TestResultData =
    {
        rightAnswers: number;
        questions: number;
        timeSpent: number;
        finishTime: string;
    }
    & TestPassingData;

/**
 * Нужен для прохождения теста
 */
export type TestPassing =
    {
        questions: QuestionPassing[];
    }
    & TestPassingData;

/**
 * Нужен, чтобы показать результаты теста
 */
export type TestResult =
    {
        questions: QuestionResult[];
    }
    & TestResultData;