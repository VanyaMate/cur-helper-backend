import { TestShortType, TestType } from '@/domain/services/test/test.types';
import { With } from '@/domain/types';
import {
    TestChildrenWithResults,
    TestShortResult,
} from '@/domain/services/tests/tests.types';


export interface ITestsService {
    getById (themeId: string, testId: string, userId?: string): Promise<With<TestType, [ TestShortResult ]>>;

    getListById (themeId: string, userId?: string): Promise<With<TestShortType, [ TestChildrenWithResults, TestShortResult ]>>;
}