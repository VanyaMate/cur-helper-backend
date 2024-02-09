import { With } from '@/domain/types';
import { ThemeShortType } from '@/domain/services/theme/theme.types';
import { TestType } from '@/domain/services/test/test.types';
import { QuestionType } from '@/domain/services/question/question.types';


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

export type ThemeQuestions = {
    questions: QuestionType[];
}