import { TestDocument } from '@/db/mongoose/test/test.model';
import { AdminTestShortType, IConverter } from '@vanyamate/cur-helper-types';


export class MongoAdminTestShortConverter implements IConverter<TestDocument, AdminTestShortType> {
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