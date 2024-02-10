import {
    TestPassingProcess,
    TestPassingResult,
    TestPassingResults,
    TestPassingTestShort,
    TestPassingThemes,
    TestPassingType,
    TestPassingUserShort,
} from '@/domain/services/test-passing/test-passing.types';
import { With } from '@/domain/types';


export interface ITestPassingService {
    start (userId: string, testId: string): Promise<With<TestPassingType, [ TestPassingProcess ]>>;

    finish (userId: string, testPassingId: string): Promise<With<TestPassingType, [ TestPassingResult ]>>;

    getById (userId: string, testPassingId: string): Promise<With<TestPassingType, [ TestPassingProcess ]>>;

    getResultById (userId: string, testPassingId: string): Promise<With<TestPassingType, [ TestPassingResults, TestPassingUserShort, TestPassingThemes, TestPassingTestShort ]>>;

    setAnswer (userId: string, testPassingId: string, questionId: string, answerId: string): Promise<With<TestPassingType, [ TestPassingProcess ]>>;
}