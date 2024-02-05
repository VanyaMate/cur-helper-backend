import {
    TestPassingProcess, TestPassingResult,
    TestPassingType,
} from '@/domain/services/test-passing/test-passing.types';
import { With } from '@/domain/types';


export interface ITestPassingService {
    start (userId: string, testId: string): Promise<With<TestPassingType, [ TestPassingProcess ]>>;

    finish (userId: string, testId: string): Promise<With<TestPassingType, [ TestPassingResult ]>>;

    setAnswer (userId: string, testId: string, questionId: string, answerId: string): Promise<With<TestPassingType, [ TestPassingProcess ]>>;
}