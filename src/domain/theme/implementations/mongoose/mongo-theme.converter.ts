import { IConverter } from '@/domain/service.types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeType } from '@/domain/theme/theme.types';


export class MongoThemeConverter implements IConverter<ThemeDocument, ThemeType> {
    to (from: ThemeDocument): ThemeType {
        return {
            id         : from.id,
            enabled    : from.enabled,
            body       : from.body,
            title      : from.title,
            additional : from.additional,
            description: from.description,
            url        : from.url,
        };
    }

    from (to: ThemeType): ThemeDocument {
        throw new Error('Method not implemented.');
    }
}