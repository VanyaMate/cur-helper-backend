import {
    TestPassingProcess,
    TestPassingResults, TestPassingTestShort, TestPassingThemes,
    TestPassingType, TestPassingUserShort, With,
} from '@vanyamate/cur-helper-types';


export interface ITestPassingService {
    start (userId: string, testId: string): Promise<With<TestPassingType, [ TestPassingProcess ]>>;

    finish (userId: string, testPassingId: string): Promise<With<TestPassingType, [ TestPassingResults, TestPassingUserShort, TestPassingThemes, TestPassingTestShort ]>>;

    getById (userId: string, testPassingId: string): Promise<With<TestPassingType, [ TestPassingProcess ]>>;

    getResultById (userId: string, testPassingId: string): Promise<With<TestPassingType, [ TestPassingResults, TestPassingUserShort, TestPassingThemes, TestPassingTestShort ]>>;

    setAnswer (userId: string, testPassingId: string, questionId: string, answerId: string): Promise<boolean>;
}