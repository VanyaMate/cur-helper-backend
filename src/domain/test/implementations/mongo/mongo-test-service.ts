import { Filter, IConverter } from '@/domain/service.types';
import { ITestService } from '@/domain/test/test-service.interface';
import { FilterQuery, Model, mongo } from 'mongoose';
import { TestDocument, TestModel } from '@/db/mongoose/test/test.model';
import { TestCreateType, TestType, TestUpdateType } from '@/domain/test/test.types';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';


export class MongoTestService implements ITestService {
    constructor (
        private readonly _mongoTestRepository: Model<TestModel>,
        private readonly _mongoThemeRepository: Model<ThemeModel>,
        private readonly _documentToPublicConverter: IConverter<TestDocument, TestType>,
        private readonly _filterMongoConverter: IConverter<Filter<TestType>, FilterQuery<TestModel>>,
    ) {
    }

    async create (data: TestCreateType): Promise<TestType> {
        try {
            const theme: ThemeDocument | null = await this._mongoThemeRepository.findOne({ publicId: data.themeId });
            if (theme) {
                const doc: TestDocument = await this._mongoTestRepository.create({
                    ...data, themeId: theme._id,
                });
                return this._documentToPublicConverter.to(doc);
            }
            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async read (data: Filter<TestType>): Promise<TestType> {
        try {
            const doc: TestDocument | null = await this._mongoTestRepository.findOne(this._filterMongoConverter.to(data));
            if (doc) {
                return this._documentToPublicConverter.to(doc);
            }
            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async update (id: string, data: TestUpdateType): Promise<TestType> {
        try {
            const doc: TestDocument | null = await this._mongoTestRepository.findOne({ _id: id });
            if (doc) {
                await doc.updateOne(data);
                return this._documentToPublicConverter.to(Object.assign(doc, data, { id: doc._id.toString() }));
            }
            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async delete (id: string): Promise<boolean> {
        try {
            const result: mongo.DeleteResult = await this._mongoTestRepository.deleteOne({ _id: id });
            return !!result.deletedCount;
        } catch (e) {
            throw e;
        }
    }

}