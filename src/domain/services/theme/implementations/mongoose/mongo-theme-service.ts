import { Filter, IConverter } from '@/domain/service.types';
import { FilterQuery, Model, mongo } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { IThemeService } from '@/domain/services/theme/theme-service.interface';
import { ThemeCreateType, ThemeType, ThemeUpdateType } from '@vanyamate/cur-helper-types';


export class MongoThemeService implements IThemeService {
    constructor (
        private readonly _mongoThemeRepository: Model<ThemeModel>,
        private readonly _documentToPublicConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _filterMongoConverter: IConverter<Filter<ThemeType>, FilterQuery<ThemeModel>>,
    ) {
    }

    async create (data: ThemeCreateType): Promise<ThemeType> {
        try {
            // create doc
            const doc: ThemeDocument = await this._mongoThemeRepository.create(data);
            // return formatted data
            return this._documentToPublicConverter.to(doc);
        } catch (e) {
            throw e;
        }
    }

    async read (data: Filter<ThemeType>): Promise<ThemeType> {
        try {
            const doc: ThemeDocument = await this._mongoThemeRepository.findOne(this._filterMongoConverter.to(data));
            if (doc) {
                return this._documentToPublicConverter.to(doc);
            } else {
                throw NOT_FOUND;
            }
        } catch (e) {
            throw e;
        }
    }

    async update (id: string, data: ThemeUpdateType): Promise<ThemeType> {
        try {
            const doc: ThemeDocument = await this._mongoThemeRepository.findOne({ _id: id });
            if (doc) {
                await doc.updateOne(data);
                return this._documentToPublicConverter.to(Object.assign(doc, data));
            } else {
                throw NOT_FOUND;
            }
        } catch (e) {
            throw e;
        }
    }

    async delete (id: string): Promise<boolean> {
        try {
            const doc: mongo.DeleteResult = await this._mongoThemeRepository.deleteOne({ _id: id });
            return !!doc.deletedCount;
        } catch (e) {
            throw e;
        }
    }
}