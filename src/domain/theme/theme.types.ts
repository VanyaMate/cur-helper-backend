import { TestResultData } from '../test/test.types';


export type Theme =
    {
        id: string;
        title: string;
        description: string;
        additional: string;
        url: string;
    }

export type ThemeBody =
    {
        body: string;
    }

export type ThemeWithTestResult =
    {
        test: TestResultData;
    }
    & Theme;

export type ThemeWithChildren =
    {
        children: Theme[];
    }
    & Theme;

export type ThemeWithTests =
    {
        children: ThemeWithTestResult[];
    }
    & ThemeWithTestResult;

export type ThemeData =
    Theme
    & ThemeBody;