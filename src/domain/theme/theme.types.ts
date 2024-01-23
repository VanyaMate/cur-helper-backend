import {
    TestPassing,
    TestResult,
} from '../test/test.types';


export type ThemeWith<T extends any[]> = T extends [ infer First, ...infer Rest ]
                                         ? First & ThemeWith<Rest>
                                         : T extends [ infer Only ] ? Only & Theme
                                                                    : Theme;

export type Theme =
    {
        id: string;
        title: string;
        description: string;
        additional: string;
        url: string;
    };

export type ThemeBody =
    {
        body: string;
    };

export type ThemeTestResult =
    {
        test: TestResult;
    };

export type ThemeTestPassing =
    {
        test: TestPassing;
    };

export type ThemeChildren =
    {
        children: ThemeWith<[ ThemeChildren ]>[];
    };

export type ThemeTests =
    {
        tests: ThemeTestResult[];
    };

export type ThemeParent =
    {
        parent: ThemeWith<[ ThemeParent ]> | null;
    }