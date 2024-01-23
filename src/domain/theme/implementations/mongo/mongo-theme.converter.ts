import { IConverter } from '@/domain/service.types';
import {
    ThemeDocument as ThemeModel,
} from '@/domain/theme/implementations/mongo/mongo-theme.model';
import { Theme } from '@/domain/theme/theme-service.interface';


export class MongoThemeConverter implements IConverter<ThemeModel, Theme> {
    to (from: ThemeModel): Theme {
        return {
            id         : from.id,
            title      : from.title,
            url        : from.url ?? '',
            description: from.description ?? '',
            body       : from.body ?? '',
            additional : from.additional ?? '',
        };
    }

    from (to: Theme): ThemeModel {
        throw new Error('Method not implemented.');
    }
}