import { Complexity } from '@/domain/enums';
import { Create } from '@/domain/types';
import { QuestionAnswerType } from '@/domain/answer/question-answer.types';


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