import {
    IConverter, TestPassingShortInfo,
    TestType,
    ThemeFullType, ThemeShortType,
    ThemeType,
} from '@vanyamate/cur-helper-types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import {
    LatestTestResultType,
} from '@/domain/services/themes/implementations/mongo/mongo-public-themes-service';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';
import { TestDocument } from '@/db/mongoose/test/test.model';


export type ThemeFullTypeConverterDocumentsType = {
    theme: ThemeDocument;
    children: ThemeDocument[];
    breadcrumb: ThemeDocument[];
    nextTheme: ThemeDocument | null;
    prevTheme: ThemeDocument | null;
    latestTestResults: LatestTestResultType[] | null;
}

export class MongoThemeFullTypeConverter implements IConverter<ThemeFullTypeConverterDocumentsType, ThemeFullType> {
    constructor (
        private readonly _testConverter: IConverter<TestDocument, TestType>,
        private readonly _themeConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
        private readonly _testShortResult: IConverter<TestPassingDocument, TestPassingShortInfo>,
    ) {
    }

    to (from: ThemeFullTypeConverterDocumentsType): ThemeFullType {
        return {
            ...this._themeConverter.to(from.theme),
            tests     : from.theme.tests.map((test) => {
                const latestResult: TestPassingDocument | null = from.latestTestResults?.find((result) => result._id.toString() === test._id.toString())?.latestTestResult;
                return {
                    ...this._testConverter.to(test),
                    shortResult:
                        this._testShortResult.to(
                            latestResult
                            ? Object.assign(latestResult, { test })
                            : null,
                        ),
                };
            }),
            breadcrumb: from.breadcrumb.map(this._themeShortConverter.to),
            children  : from.children.map(this._themeShortConverter.to),
            next      : from.nextTheme ? this._themeShortConverter.to(from.nextTheme)
                                       : null,
            prev      : from.prevTheme ? this._themeShortConverter.to(from.prevTheme)
                                       : null,
        };
    }

    from (to: ThemeFullType): ThemeFullTypeConverterDocumentsType {
        throw new Error('Method not implemented.');
    }
}