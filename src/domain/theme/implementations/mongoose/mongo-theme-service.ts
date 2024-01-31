import { Filter, IConverter } from '@/domain/service.types';
import { IThemeService } from '@/domain/theme/theme-service.interface';
import { ThemeCreateType, ThemeType, ThemeUpdateType } from '../../theme.types';
import { FilterQuery, Model, mongo } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';


export class MongoThemeService implements IThemeService {
    constructor (
        private readonly _mongoThemeModel: Model<ThemeModel>,
        private readonly _dataConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _filterConverter: IConverter<Filter<ThemeType>, FilterQuery<ThemeModel>>,
    ) {
    }

    async create (data: ThemeCreateType): Promise<ThemeType> {
        try {
            // create doc
            const doc: ThemeDocument = await this._mongoThemeModel.create(data);
            // return formatted data
            return this._dataConverter.to(doc);
        } catch (e) {
            throw e;
        }
    }

    async read (data: Filter<ThemeType>): Promise<ThemeType> {
        try {
            const doc: ThemeDocument = await this._mongoThemeModel.findOne(this._filterConverter.to(data));
            if (doc) {
                return this._dataConverter.to(doc);
            } else {
                throw NOT_FOUND;
            }
        } catch (e) {
            throw e;
        }
    }

    async update (id: string, data: ThemeUpdateType): Promise<ThemeType> {
        try {
            const doc: ThemeDocument = await this._mongoThemeModel.findOne({ id });
            if (doc) {
                await doc.updateOne(data);
                return this._dataConverter.to({ ...doc, ...data } as ThemeDocument);
            } else {
                throw NOT_FOUND;
            }
        } catch (e) {
            throw e;
        }
    }

    async delete (id: string): Promise<boolean> {
        try {
            const doc: mongo.DeleteResult = await this._mongoThemeModel.deleteOne({ id });
            return !!doc.deletedCount;
        } catch (e) {
            throw e;
        }
    }
}