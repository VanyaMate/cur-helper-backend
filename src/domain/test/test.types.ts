import { Question, QuestionPassing, QuestionResult } from '@/domain/question/question.types';
import { With } from '@/domain/types';


export type TestWith<T extends any[]> = With<Test, T>;

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
    questionsAmount: number;
}


export type TestQuestions<QuestionType> = {
    questions: QuestionType[];
}

export type TestPassing = {
    passing: TestPassingData;
}

export type TestResult = {
    result: TestResultsData;
}

export type TestResults = {
    results: TestResultsData[];
}

export type TestPassingData = {
    status: TestStatus;
    startTime: string;
    questions: QuestionPassing[];
}

export type TestResultsData = {
    status: TestStatus;
    startTime: string;
    finishTime: string;
    rightAnswers: number;
    questions: QuestionResult[];
}