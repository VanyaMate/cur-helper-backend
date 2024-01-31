import { Filter } from '@/domain/service.types';
import { IThemeService } from '@/domain/theme/theme-service.interface';
import { ThemeCreateType, ThemeType, ThemeUpdateType } from '../../theme.types';
import { FilterQuery, Model, mongo } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';


export class MongoThemeService implements IThemeService {
    constructor (
        private readonly _mongoThemeModel: Model<ThemeModel>,
    ) {
    }

    async create (data: ThemeCreateType): Promise<ThemeType> {
        try {
            // create doc
            const doc: ThemeDocument = await this._mongoThemeModel.create(data);
            // return formatted data
            return {
                id         : doc.id,
                body       : doc.body,
                title      : doc.title,
                description: doc.description,
            };
        } catch (e) {
            throw e;
        }
    }

    async read (data: Filter<ThemeType>): Promise<ThemeType> {
        try {
            const doc: ThemeDocument = await this._mongoThemeModel.findOne(this._convertToMongoFilter(data));
            if (doc) {
                return {
                    id         : doc.id,
                    body       : doc.body,
                    title      : doc.title,
                    description: doc.description,
                };
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
                return {
                    id         : data.id ?? doc.id,
                    body       : data.body ?? doc.body,
                    title      : data.title ?? doc.title,
                    description: data.description ?? doc.description,
                };
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

    private _convertToMongoFilter (data: Filter<ThemeType>): FilterQuery<ThemeModel> {
        const filter: FilterQuery<ThemeModel> = {};

        Object.entries(data).forEach(([ key, value ]) => {
            if (value.type === 'match') {
                filter[key] = { $regexp: new RegExp(`${ value.value }`) };
            } else {
                filter[key] = value.value;
            }
        });

        return filter;
    }
}