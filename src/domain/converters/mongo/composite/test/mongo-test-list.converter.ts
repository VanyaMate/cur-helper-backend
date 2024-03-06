import {
    ThemeShortType,
    ThemeTestsWithShortResults,
} from '@vanyamate/cur-helper-types';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';
import {
    IMongoTestConverter, IMongoTestListConverter, IMongoTestPassingShortConverter,
    IMongoThemeShortConverter, MongoTestListDataType,
} from '@/domain/converters/mongo/mongo-converters.types';


export class MongoTestListConverter implements IMongoTestListConverter {
    constructor (
        private readonly _themeShortConverter: IMongoThemeShortConverter,
        private readonly _testConverter: IMongoTestConverter,
        private readonly _testPassingShortConverter: IMongoTestPassingShortConverter,
    ) {
    }

    to (from: MongoTestListDataType): (ThemeTestsWithShortResults & ThemeShortType)[] {
        return from.themes.map((themeDocument) => ({
            ...this._themeShortConverter.to(themeDocument),
            tests: themeDocument.tests.map((testDocument) => {
                const latestResult: TestPassingDocument | null = from.latestTestResults.find((result) => result._id.toString() === testDocument._id.toString())?.latestTestResult;
                return {
                    ...this._testConverter.to(testDocument),
                    shortResult:
                        this._testPassingShortConverter.to(
                            latestResult
                            ? Object.assign(latestResult, { test: testDocument })
                            : null,
                        ),
                };
            }),
        }));
    }

    from (to: (ThemeTestsWithShortResults & ThemeShortType)[]): MongoTestListDataType {
        throw new Error('Method not implemented.');
    }
}