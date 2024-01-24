import {
    Test,
    TestPassing,
    TestResults,
    TestWith,
} from '@/domain/test/test.types';


export interface ITestsService {
    getById (id: string): Promise<Test>;

    getByIdWithResults (id: string, userId?: string): Promise<TestWith<[ TestResults ]>>;

    getByIdWithPassing (id: string, userId?: string): Promise<TestWith<[ TestPassing ]>>;
}