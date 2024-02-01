import { IConverter } from '@/domain/service.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { TestType } from '@/domain/services/test/test.types';


export class MongoTestConverter implements IConverter<TestDocument, TestType> {
    to (from: TestDocument): TestType {
        return {
            id                 : from._id.toString(),
            themeId            : from.themeId.toString(),
            enabled            : from.enabled,
            title              : from.title,
            description        : from.description,
            timeToPass         : from.timeToPass,
            questionsAmount    : from.questionsAmount,
            unsatisfactoryScore: from.unsatisfactoryScore,
            satisfactoryScore  : from.satisfactoryScore,
            perfectScore       : from.perfectScore,
        };
    }

    from (to: TestType): TestDocument {
        throw new Error('Method not implemented.');
    }

}