import { IConverter } from '@/domain/service.types';
import { Theme as ThemeModel } from '@/modules/api/v1/theme/theme.model';
import { Theme } from '@/domain/theme/theme-service.interface';


export class MongoThemeConverter implements IConverter<ThemeModel, Theme> {
    to (from: ThemeModel): Theme {
        return {
            id         : from.id,
            title      : from.title,
            url        : from.url ?? '',
            description: from.description ?? '',
            children   : from.children?.map((theme) => this.to(theme)) ?? [],
            body       : from.body ?? '',
            additional : from.additional ?? '',
        };
    }

    from (to: Theme): ThemeModel {
        throw new Error('Method not implemented.');
    }
}