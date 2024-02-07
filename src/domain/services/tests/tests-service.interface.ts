import { TestType } from '@/domain/services/test/test.types';


export interface ITestsService {
    getTestsList (): Promise<TestType[]>;
}