import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeType } from '@vanyamate/cur-helper-types';
import { IMongoThemeConverter } from '@/domain/converters/mongo/mongo-converters.types';


export class MongoThemeConverter implements IMongoThemeConverter {
    to (from: ThemeDocument): ThemeType {
        return {
            id         : from._id.toString(),
            publicId   : from.publicId,
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