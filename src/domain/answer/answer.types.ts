import { With } from '@/domain/types';


export type AnswerWith<T extends any[]> = With<Answer, T>;

export type Answer =
    {
        id: string;
        title: string;
    };

export type AnswerSelect =
    {
        selected: boolean;
    };


export type AnswerResultType = {
    isCorrect: boolean;
    reason: string;
};

export type AnswerResult =
    {
        result: AnswerResultType;
    };