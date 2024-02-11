import { IConverter } from '@/domain/service.types';
import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingType,
} from '@/domain/services/test-passing/test-passing.types';


export class MongoTestPassingConverter implements IConverter<TestPassingDocument, TestPassingType> {
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