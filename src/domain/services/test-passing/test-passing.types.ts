import { TestShortType } from '@/domain/services/test/test.types';
import { UserType } from '@/domain/services/user/user.types';
import { With } from '@/domain/types';
import {
    QuestionSelect,
    QuestionResult,
    QuestionType, QuestionShortType, QuestionThemes,
} from '@/domain/services/question/question.types';
import { Status } from '@/domain/enums';
import { ThemeShortType } from '@/domain/services/theme/theme.types';
import { ThemeQuestionsAmount } from '@/domain/services/themes/themes.types';


export type TestPassingResult =
    'no-result'
    | 'satis'
    | 'unsatis'
    | 'perfect';

export type TestPassingState =
    'process'
    | 'finished';

export type TestPassingType = {
    id: string;
    isPrivate: boolean;
    status: TestPassingState;
    startTime: number;
}

export type TestPassingProcess = {
    questions: With<QuestionType, [ QuestionSelect ]>[];
    remainingTime: number;
}

export type TestPassingResults = {
    result: TestPassingResult;
    rightAnswers: number;
    finishTime: number;
    questions: With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes ]>[];
}

export type TestPassingResultsShort =
    {
        result: TestPassingResult;
        rightAnswers: number;
        finishTime: number;
        questionsAmount: number;
    };

export type TestPassingTestShort = {
    test: TestShortType;
}

export type TestPassingUserShort = {
    user: UserType;
}

export type TestPassingThemes = {
    themes: ThemeShortType[];
}

export type TestPassingShortInfo =
    Pick<TestPassingType, 'id' | 'status'>
    & TestPassingResultsShort;