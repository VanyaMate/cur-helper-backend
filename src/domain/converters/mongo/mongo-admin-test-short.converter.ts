import { IConverter } from '@/domain/service.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { AdminTestShortType } from '@/domain/services/test/test.types';


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