import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { IConverter, ThemeShortType } from '@vanyamate/cur-helper-types';
import {
    IMongoThemeShortConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoThemeShortConverter implements IMongoThemeShortConverter {
    to (from: ThemeDocument): ThemeShortType {
        return {
            publicId   : from.publicId,
            title      : from.title,
            url        : from.url,
            additional : from.additional,
            description: from.description,
        };
    }

    from (to: ThemeShortType): ThemeDocument {
        throw new Error('Method not implemented.');
    }
}