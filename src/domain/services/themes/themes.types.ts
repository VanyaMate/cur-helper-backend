import { With } from '@/domain/types';
import { ThemeShortType, ThemeType } from '@/domain/services/theme/theme.types';
import { TestType } from '@/domain/services/test/test.types';


export type ThemeWith<T extends any[]> = With<ThemeType, T>;
export type ThemeChildren = {
    children: ThemeWith<[ ThemeChildren ]>
}

export type ThemeBreadcrumb = {
    breadcrumb: ThemeShortType[];
}

export type ThemeTests = {
    tests: TestType[];
}

export type ThemeQuestions = {
    questions: ThemeQuestions[];
}