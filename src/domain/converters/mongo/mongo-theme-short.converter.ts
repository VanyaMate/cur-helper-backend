import { IConverter } from '@/domain/service.types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeShortType } from '@vanyamate/cur-helper-types';


export class MongoThemeShortConverter implements IConverter<ThemeDocument, ThemeShortType> {
    to (from: ThemeDocument): ThemeShortType {
        return {
            publicId  : from.publicId,
            title     : from.title,
            url       : from.url,
            additional: from.additional,
        };
    }

    from (to: ThemeShortType): ThemeDocument {
        throw new Error('Method not implemented.');
    }
}