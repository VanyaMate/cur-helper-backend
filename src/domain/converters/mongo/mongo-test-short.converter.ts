import { TestDocument } from '@/db/mongoose/test/test.model';
import { IConverter, TestShortType } from '@vanyamate/cur-helper-types';


export class MongoTestShortConverter implements IConverter<TestDocument, TestShortType> {
    to (from: TestDocument): TestShortType {
        return {
            id     : from._id.toString(),
            themeId: from.themeId.toString(),
            title  : from.title,
        };
    }

    from (to: TestShortType): TestDocument {
        throw new Error('Method not implemented.');
    }
}