import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import { TestPassingType } from '@vanyamate/cur-helper-types';
import {
    IMongoTestPassingConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestPassingConverter implements IMongoTestPassingConverter {
    to (from: TestPassingDocument): TestPassingType {
        return {
            id       : from._id.toString(),
            isPrivate: from.isPrivate,
            status   : from.status,
            startTime: from.startTime,
        };
    }

    from (to: TestPassingType): TestPassingDocument {
        throw new Error('Method not implemented.');
    }
}