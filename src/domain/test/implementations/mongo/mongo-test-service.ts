import { Filter, IConverter } from '@/domain/service.types';
import { ITestService } from '@/domain/test/test-service.interface';
import { FilterQuery, Model, mongo } from 'mongoose';
import { TestDocument, TestModel } from '@/db/mongoose/test/test.model';
import { TestCreateType, TestType, TestUpdateType } from '@/domain/test/test.types';
import { NOT_FOUND } from '@/domain/exceptions/errors';


export class MongoTestService implements ITestService {
    constructor (
        private readonly _mongoTestModel: Model<TestModel>,
        private readonly _dataConverter: IConverter<TestDocument, TestType>,
        private readonly _filterConverter: IConverter<Filter<TestType>, FilterQuery<TestModel>>,
    ) {
    }

    async create (data: TestCreateType): Promise<TestType> {
        try {
            const doc: TestDocument = await this._mongoTestModel.create(data);
            return this._dataConverter.to(doc);
        } catch (e) {
            throw e;
        }
    }

    async read (data: Filter<TestType>): Promise<TestType> {
        try {
            const doc: TestDocument | null = await this._mongoTestModel.findOne(this._filterConverter.to(data));
            if (doc) {
                return this._dataConverter.to(doc);
            }
            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async update (id: string, data: TestUpdateType): Promise<TestType> {
        try {
            const doc: TestDocument | null = await this._mongoTestModel.findOne({ _id: id });
            if (doc) {
                await doc.updateOne(data);
                return this._dataConverter.to({ ...doc, ...data } as TestDocument);
            }
            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async delete (id: string): Promise<boolean> {
        try {
            const result: mongo.DeleteResult = await this._mongoTestModel.deleteOne({ _id: id });
            return !!result.deletedCount;
        } catch (e) {
            throw e;
        }
    }

}