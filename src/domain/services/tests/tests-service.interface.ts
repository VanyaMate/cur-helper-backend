import { TestType } from '@/domain/services/test/test.types';
import { With } from '@/domain/types';
import {
    TestShortResult,
} from '@/domain/services/tests/tests.types';
import { ThemeShortType } from '@/domain/services/theme/theme.types';
import {
    ThemeTestsWithShortResults,
} from '@/domain/services/themes/themes.types';


export interface ITestsService {
    getOneTestByIds (themeId: string, testId: string, userId?: string): Promise<With<TestType, [ TestShortResult ]>>;

    getTestListByThemeId (themeId: string, userId?: string): Promise<With<ThemeShortType, [ ThemeTestsWithShortResults ]>[]>;
}