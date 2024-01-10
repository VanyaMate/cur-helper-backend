import { IConverter, Filter } from '@/domain/service.types';
import {
    CreateThemeData,
    IThemeService,
    Theme,
} from '@/domain/theme/theme-service.interface';
import { Model } from 'mongoose';
import { Theme as ThemeModel, ThemeDocument } from '@/modules/api/v1/theme/theme.model';
import { IDtoValidator } from '@/domain/dto.validator';


export class MongoThemeService implements IThemeService {
    constructor (
        private readonly _mongoRepository: Model<ThemeModel>,
        private readonly _converter: IConverter<ThemeModel, Theme>,
        private readonly _dtoValidator: IDtoValidator,
    ) {
    }

    async create (data: CreateThemeData): Promise<Theme> {
        try {
            await this._dtoValidator.validate(data);
            const themeDocument: ThemeDocument = await this._mongoRepository.create(data);
            return this._converter.to(themeDocument);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async read (data: Filter<Theme>): Promise<Theme> {
        throw new Error('Method not implemented.');
    }

    async update (id: string, data: Partial<Theme>): Promise<Theme> {
        throw new Error('Method not implemented.');
    }

    async delete (id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}