import { TestShortType } from '@/domain/services/test/test.types';
import {
    TestPassingShortInfo,
} from '@/domain/services/test-passing/test-passing.types';
import { With } from '@/domain/types';


export type TestChildren = {
    children: TestShortType[];
}

export type TestChildrenWithResults = {
    children: With<TestShortType, [ TestChildren, TestShortType ]>[]
}

export type TestShortResult = {
    shortResult: TestPassingShortInfo | null
}