import { IConverter } from '@/domain/service.types';
import { TestDocument } from '@/domain/test/implementations/mongo/mongo-test.model';
import { Test, TestWith } from '@/domain/test/test.types';


export class MongoTestConverter implements IConverter<TestDocument, Test> {
    to (from: TestDocument): Test {
        return {
            id             : from.id,
            title          : from.title,
            description    : from.description,
            timeToPass     : from.timeToPass,
            questionsAmount: from.questionsAmount,
        };
    }

    from (to: Test): TestDocument {
        throw new Error('Method not implemented.');
    }
}