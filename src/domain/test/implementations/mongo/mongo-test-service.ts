import { Filter } from '@/domain/service.types';
import { ITestService } from '@/domain/test/test-service.interface';
import { Model } from 'mongoose';
import { TestModel } from '@/db/mongoose/test/test.model';


export class MongoTestService implements ITestService {
    constructor (
        private readonly _mongoTestModel: Model<TestModel>,
    ) {
    }

    create (data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    read (data: Filter<any>): Promise<any> {
        throw new Error('Method not implemented.');
    }

    update (id: any, data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    delete (id: any): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}