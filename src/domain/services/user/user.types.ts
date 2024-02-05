import {
    TestPassingResults,
    TestPassingType,
} from '@/domain/services/test-passing/test-passing.types';
import { Create, With } from '@/domain/types';
import { RoleType } from '@/domain/services/role/role.types';


export type UserType = {
    login: string;
    avatarUrl: string;
    email: string;
    info: {
        firstName: string;
        lastName: string;
    },
    role: RoleType | null;
}

export type UserTestPassing = {
    testPassing: With<TestPassingType, [ TestPassingResults ]>[];
}

export type UserCreateType =
    Create<UserType, 'login'>
    & { password: string };
export type UserUpdateType =
    Partial<UserType>;