import {
    Test,
    TestPassing, TestResult,
    TestResults,
    TestWith,
} from '@/domain/test/test.types';
import { Filter, MultiplyResponse, Options } from '@/domain/service.types';


export interface ITestsService {
    getById (id: string): Promise<Test>;

    getByIdWithResults (id: string, userId: string): Promise<TestWith<[ TestResults ]>>;

    getByIdWithPassing (id: string, userId: string): Promise<TestWith<[ TestPassing ]>>;

    getAllWithResults (userId: string, filter: Filter<TestWith<[ TestResult ]>>, options: Options<TestWith<[ TestResult ]>>): Promise<MultiplyResponse<TestWith<[ TestResult ]>>>;
}