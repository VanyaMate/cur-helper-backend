import { Filter, IConverter } from '@/domain/service.types';
import { CreateTestType, ITestService } from '@/domain/test/test-service.interface';
import { Test } from '../../test.types';
import { Model } from 'mongoose';
import { Test as TestMongo, TestDocument } from './mongo-test.model';


export class MongoTestService implements ITestService {
    constructor (
        private readonly _modelTest: Model<TestMongo>,
        private readonly _converter: IConverter<TestDocument, Test>,
    ) {
    }

    async create (data: CreateTestType): Promise<Test> {
        const test: TestDocument = await this._modelTest.create(data);
        return this._converter.to(test);
    }

    read (data: Filter<Test>): Promise<Test> {
        throw new Error('Method not implemented.');
    }

    update (id: string, data: Partial<Test>): Promise<Test> {
        throw new Error('Method not implemented.');
    }

    delete (id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}