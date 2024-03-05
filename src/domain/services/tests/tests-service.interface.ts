import {
    TestQuestionsThemesShort,
    TestShortResult, TestThemeShort,
    TestType, ThemeShortType,
    ThemeTestsWithShortResults, With,
} from '@vanyamate/cur-helper-types';


export interface ITestsService {
    getOneTestByIds (testId: string, userId?: string): Promise<With<TestType, [ TestShortResult, TestThemeShort, TestQuestionsThemesShort ]>>;

    getTestListByThemeId (themeId: string, userId?: string): Promise<With<ThemeShortType, [ ThemeTestsWithShortResults ]>[]>;
}