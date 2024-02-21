import { Complexity } from '@/domain/enums';
import { Create } from '@/domain/types';
import { QuestionAnswerType } from '@/domain/services/answer/question-answer.types';
import { ThemeShortType } from '@/domain/services/theme/theme.types';


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

export type QuestionSelect = {
    selectId: string;
}

export type QuestionResult = {
    timeSpent: number;
    answerTime: number;
}

export type QuestionThemes = {
    themes: ThemeShortType[];
}

export type QuestionCreateType = Create<QuestionType, 'title' | 'answers'>;
export type QuestionUpdateType = Partial<QuestionType>;
export type QuestionShortType = Pick<QuestionType, 'id' | 'title' | 'description' | 'complexity'>;
export type AdminQuestionShortType = Pick<QuestionType, 'id' | 'title' | 'description' | 'complexity' | 'enabled'>;