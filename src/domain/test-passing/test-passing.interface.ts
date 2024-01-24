import { TestPassing, TestResult, TestWith } from '@/domain/test/test.types';


export interface ITestPassing {
    startTest (userId: string, testId: string): Promise<TestWith<[ TestPassing ]>>;

    selectQuestion (userId: string, passingId: string, questionId: string, answerId: string): Promise<boolean>;

    finishTest (userId: string, passingId: string): Promise<TestWith<[ TestPassing, TestResult ]>>;
}