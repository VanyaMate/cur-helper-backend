import { TestType } from '@/domain/services/test/test.types';
import { With } from '@/domain/types';
import {
    TestQuestionsThemesShort,
    TestShortResult, TestThemeShort,
} from '@/domain/services/tests/tests.types';
import { ThemeShortType } from '@/domain/services/theme/theme.types';
import {
    ThemeTestsWithShortResults,
} from '@/domain/services/themes/themes.types';


export interface ITestsService {
    getOneTestByIds (testId: string, userId?: string): Promise<With<TestType, [ TestShortResult, TestThemeShort, TestQuestionsThemesShort ]>>;

    getTestListByThemeId (themeId: string, userId?: string): Promise<With<ThemeShortType, [ ThemeTestsWithShortResults ]>[]>;
}