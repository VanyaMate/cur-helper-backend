import { IConverter } from '@/domain/service.types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeType } from '@/domain/theme/theme.types';


export class MongoThemeConverter implements IConverter<ThemeDocument, ThemeType> {
    to (from: ThemeDocument): ThemeType {
        return {
            id         : from.id,
            body       : from.body,
            title      : from.title,
            description: from.description,
        };
    }

    from (to: ThemeType): ThemeDocument {
        throw new Error('Method not implemented.');
    }
}