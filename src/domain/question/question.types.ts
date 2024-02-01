import { Complexity } from '@/domain/enums';
import { Create } from '@/domain/types';


export type QuestionAnswerType = {
    id: string;
    title: string;
    description: string;
    correct: boolean;
}

export type QuestionType = {
    id: string;
    enabled: boolean;
    title: string;
    description: string;
    body: string;
    complexity: Complexity;
    points: number;
    answers: QuestionAnswerType[];
}

export type QuestionCreateType = Create<QuestionType, 'title' | 'answers'>;
export type QuestionUpdateType = Partial<QuestionType>;