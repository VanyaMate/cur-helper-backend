import { IConverter } from '@/domain/service.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import {
    TestChildrenWithResults,
    TestShortResult,
    TestShortType,
} from '@vanyamate/cur-helper-types';


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