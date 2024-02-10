import { IConverter } from '@/domain/service.types';
import {
    TestChildrenWithResults,
    TestShortResult,
} from '@/domain/services/tests/tests.types';
import { TestShortType } from '@/domain/services/test/test.types';
import { TestDocument } from '@/db/mongoose/test/test.model';


export class MongoTestsChildrenConverter implements IConverter<any, (TestChildrenWithResults & TestShortResult & TestShortType)[]> {
    constructor (
        private readonly _testShortConverter: IConverter<TestDocument, TestShortType>,
    ) {
    }

    to (from: any): (TestChildrenWithResults & TestShortResult & TestShortType)[] {
        throw new Error('Method not implemented.');
    }

    from (to: (TestChildrenWithResults & TestShortResult & TestShortType)[]): any {
        throw new Error('Method not implemented.');
    }
}