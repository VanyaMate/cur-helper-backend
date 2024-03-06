import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { AdminThemeShortType } from '@vanyamate/cur-helper-types';
import {
    IMongoAdminThemeShortConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoAdminThemeShortConverter implements IMongoAdminThemeShortConverter {
    to (from: ThemeDocument): AdminThemeShortType {
        return {
            id         : from._id.toString(),
            publicId   : from.publicId,
            title      : from.title,
            description: from.description,
            enabled    : from.enabled,
            url        : from.url,
        };
    }

    from (to: AdminThemeShortType): ThemeDocument {
        throw new Error('Method not implemented.');
    }

}