import { Create } from '@/domain/types';


export type TestType = {
    id: string;
    enabled: boolean;
    themeId: string;
    title: string;
    description: string;
    timeToPass: number;
    questionsAmount: number;
    unsatisfactoryScore: number;
    satisfactoryScore: number;
    perfectScore: number;
}

export type TestCreateType = Create<TestType, 'themeId' | 'title'>;
export type TestUpdateType = Partial<TestType>;
export type TestShortType = Pick<TestType, 'id' | 'themeId' | 'title'>;
export type AdminTestShortType = Pick<TestType, 'id' | 'themeId' | 'title' | 'enabled'>