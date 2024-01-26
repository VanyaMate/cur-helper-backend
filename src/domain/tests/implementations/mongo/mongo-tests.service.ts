import { Filter, Options, MultiplyResponse, IConverter } from '@/domain/service.types';
import { Test, TestResults, TestPassing, TestResult } from '@/domain/test/test.types';
import { ITestsService } from '@/domain/tests/tests-service.interface';
import { Model } from 'mongoose';
import {
    Test as TestModel,
    TestDocument,
} from '@/domain/test/implementations/mongo/mongo-test.model';


export class MongoTestsService implements ITestsService {
    constructor (
        private readonly _testsModel: Model<TestModel>,
        private readonly _testConverter: IConverter<TestDocument, Test>,
    ) {
    }

    getById (id: string): Promise<Test> {
        throw new Error('Method not implemented.');
    }

    getByIdWithResults (id: string, userId: string): Promise<TestResults & Test> {
        throw new Error('Method not implemented.');
    }

    getByIdWithPassing (id: string, userId: string): Promise<TestPassing & Test> {
        throw new Error('Method not implemented.');
    }

    async getAllWithResults (userId: string, filter: Filter<TestResult & Test>, options: Options<TestResult & Test>): Promise<MultiplyResponse<TestResult & Test>> {
        const tests: TestDocument[] = await this._testsModel.find();
        return {
            options,
            count: tests.length,
            list : tests.map((test) => ({
                ...this._testConverter.to(test), result: null,
            })),
        };
    }
}