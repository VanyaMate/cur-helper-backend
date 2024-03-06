import {
    IMongoTestConverter,
    IMongoTestFullDataConverter,
    IMongoTestPassingShortConverter,
    IMongoThemeShortConverter,
    MongoTestFullDataType,
} from '@/domain/converters/mongo/mongo-converters.types';
import {
    TestShortResult,
    TestThemeShort,
    TestQuestionsThemesShort,
    TestType,
} from '@vanyamate/cur-helper-types';


export class MongoTestFullDataConvertert implements IMongoTestFullDataConverter {
    constructor (
        private readonly _testConverter: IMongoTestConverter,
        private readonly _themeShortConverter: IMongoThemeShortConverter,
        private readonly _testPassingShortConverter: IMongoTestPassingShortConverter,
    ) {
    }

    to (from: MongoTestFullDataType): TestShortResult & TestThemeShort & TestQuestionsThemesShort & TestType {
        return {
            ...this._testConverter.to(from.test),
            shortResult: from.testPassing
                         ? this._testPassingShortConverter.to(from.testPassing) : null,
            theme      : this._themeShortConverter.to(from.test.theme),
            themes     : [ ...from.themes ].map(([ id, theme ]) => this._themeShortConverter.to(theme)),
        };
    }

    from (to: TestShortResult & TestThemeShort & TestQuestionsThemesShort & TestType): MongoTestFullDataType {
        throw new Error('Method not implemented.');
    }
}