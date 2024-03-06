import { TestDocument } from '@/db/mongoose/test/test.model';
import { TestShortType } from '@vanyamate/cur-helper-types';
import {
    IMongoTestShortConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestShortConverter implements IMongoTestShortConverter {
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