import { TestDocument } from '@/db/mongoose/test/test.model';
import { AdminTestShortType } from '@vanyamate/cur-helper-types';
import {
    IMongoAdminTestShortConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoAdminTestShortConverter implements IMongoAdminTestShortConverter {
    to (from: TestDocument): AdminTestShortType {
        return {
            id     : from._id.toString(),
            themeId: from.themeId.toString(),
            title  : from.title,
            enabled: from.enabled,
        };
    }

    from (to: AdminTestShortType): TestDocument {
        throw new Error('Method not implemented.');
    }
}