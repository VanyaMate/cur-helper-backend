import { TestFullType, TestListType } from '@vanyamate/cur-helper-types';


export interface ITestsService {
    getOneTestByIds (testId: string, userId?: string): Promise<TestFullType>;

    getTestListByThemeId (themeId: string, userId?: string): Promise<TestListType[]>;
}