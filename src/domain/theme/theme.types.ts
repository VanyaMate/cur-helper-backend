import { TestResultData } from '../test/test.types';


export type Theme = {
    id: string;
    title: string;
    description: string;
    additional: string;
    url: string[];
}

export type ThemeWithTest =
    {
        test: TestResultData;
    }
    & Theme;