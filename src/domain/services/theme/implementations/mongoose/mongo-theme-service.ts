import { FilterQuery, Model, mongo } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { IThemeService } from '@/domain/services/theme/theme-service.interface';
import {
    Filter,
    IConverter, IErrorCaller,
    ThemeCreateType,
    ThemeType,
    ThemeUpdateType,
} from '@vanyamate/cur-helper-types';
import { IValidator } from '@/domain/dto.validator';


export class MongoThemeService implements IThemeService {
    constructor (
        private readonly _errorCaller: IErrorCaller,
        private readonly _mongoThemeRepository: Model<ThemeModel>,
        private readonly _documentToPublicConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _filterMongoConverter: IConverter<Filter<ThemeType>, FilterQuery<ThemeModel>>,
    ) {
    }

    async create (data: ThemeCreateType): Promise<ThemeType> {
        try {
            const theme: ThemeDocument = await this._mongoThemeRepository.create(data);
            return this._documentToPublicConverter.to(theme);
        } catch (e) {
            // TODO: Сделать обработку ошибок mongo
            // TODO: Сделать ошибки отдельными с возможностью локализации
            // 11000 error code === DuplicateKey
            if (e.code === 11000) {
                throw this._errorCaller.noValidData([
                    {
                        target  : 'publicId',
                        messages: [ 'Такой publicId уже существует' ],
                    },
                ]);
            } else {
                throw this._errorCaller.noValidData([
                    {
                        target  : 'database',
                        messages: [ e.toString() ],
                    },
                ]);
            }
        }
    }

    async read (data: Filter<ThemeType>): Promise<ThemeType> {
        const doc: ThemeDocument = await this._mongoThemeRepository.findOne(this._filterMongoConverter.to(data));
        if (doc) {
            return this._documentToPublicConverter.to(doc);
        } else {
            throw this._errorCaller.notFound([
                {
                    target  : 'theme',
                    messages: [ 'Темы с заданными фильтрами не найдено' ],
                },
            ]);
        }
    }

    async update (id: string, data: ThemeUpdateType): Promise<ThemeType> {
        const doc: ThemeDocument = await this._mongoThemeRepository.findOne({ _id: id });
        if (doc) {
            await doc.updateOne(data);
            return this._documentToPublicConverter.to(Object.assign(doc, data));
        } else {
            throw this._errorCaller.notFound([
                {
                    target  : 'theme',
                    messages: [ 'Темы с заданными фильтрами не найдено' ],
                },
            ]);
        }
    }

    async delete (id: string): Promise<boolean> {
        try {
            const doc: mongo.DeleteResult = await this._mongoThemeRepository.deleteOne({ _id: id });
            return !!doc.deletedCount;
        } catch (e) {
            throw this._errorCaller.noValidData([
                {
                    target  : 'database',
                    messages: [ e.toString() ],
                },
            ]);
        }
    }
}