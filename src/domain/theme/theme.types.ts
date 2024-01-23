import {
    TestPassing, TestResult,
} from '../test/test.types';
import { With } from '@/domain/types';
import { ThemeDocument } from '@/domain/theme/implementations/mongo/mongo-theme.model';


export type ThemeWith<T extends any[]> = With<ThemeDocument, T>;

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