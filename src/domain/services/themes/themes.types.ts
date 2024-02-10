import { With } from '@/domain/types';
import { ThemeShortType } from '@/domain/services/theme/theme.types';
import { TestShortType, TestType } from '@/domain/services/test/test.types';
import { QuestionType } from '@/domain/services/question/question.types';
import { TestShortResult } from '@/domain/services/tests/tests.types';


export type ThemeChildren = {
    children: ThemeShortType[]
}

export type ThemeNext = {
    next: ThemeShortType | null;
}

export type ThemePrev = {
    prev: ThemeShortType | null;
}

export type ThemeRecursiveChildren = {
    children: With<ThemeShortType, [ ThemeRecursiveChildren ]>[]
}

export type ThemeBreadcrumb = {
    breadcrumb: ThemeShortType[];
}

export type ThemeTests = {
    tests: TestType[];
}

export type ThemeTestsShort = {
    tests: TestShortType[];
}

export type ThemeTestsWithShortResults = {
    tests: With<TestType, [ TestShortResult ]>[]
}

export type ThemeQuestions = {
    questions: QuestionType[];
}