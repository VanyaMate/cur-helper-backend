import { Filter, Options, MultiplyResponse, IConverter } from '@/domain/service.types';
import { Theme, ThemeWithChildren } from '@/domain/theme/theme.types';
import { IThemesService } from '@/domain/themes/themes-service.interface';
import { Model } from 'mongoose';
import { Theme as ThemeModel, ThemeDocument } from '@/modules/api/v1/theme/theme.model';


export class MongoThemesService implements IThemesService {
    constructor (
        private readonly _mongoRepository: Model<ThemeModel>,
        private readonly _converter: IConverter<ThemeModel, Theme>,
    ) {
    }

    findOne () {
        throw new Error('Method not implemented.');
    }

    async findMany (filter: Filter<Theme>, options: Options<Theme>): Promise<MultiplyResponse<Theme>> {
        const themes = await this._mongoRepository.find({}, {}, {
            skip: options.offset, limit: options.limit, sort: options.sort,
        });
        console.log(themes);
        return {
            options,
            list : themes.map((theme) => this._converter.to(theme)),
            count: 1,
        };
    }

    async findManyManyWithChildren (filter: Filter<Theme>, options: Options<Theme>): Promise<MultiplyResponse<ThemeWithChildren>> {
        throw new Error('Method not implemented.');
    }

}