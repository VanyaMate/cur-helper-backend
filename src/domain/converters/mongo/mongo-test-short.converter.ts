import { IConverter } from '@/domain/service.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { TestShortType } from '@/domain/services/test/test.types';


export class MongoTestShortConverter implements IConverter<TestDocument, TestShortType> {
    to (from: TestDocument): TestShortType {
        throw new Error('Method not implemented.');
    }

    from (to: TestShortType): TestDocument {
        throw new Error('Method not implemented.');
    }
}