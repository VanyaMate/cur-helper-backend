import {
    TestPassingResults,
    TestPassingType,
} from '@/domain/services/test-passing/test-passing.types';
import { Create, With } from '@/domain/types';
import { RoleType } from '@/domain/services/role/role.types';


export type UserType = {
    id: string;
    login: string;
    avatarUrl: string;
    email: string;
    firstName: string;
    lastName: string;
    role: RoleType | null;
}

export type UserTestPassing = {
    testPassing: With<TestPassingType, [ TestPassingResults ]>[];
}

export type UserCreateType =
    Create<Omit<UserType, 'role'>, 'login'>
    & { password: string };
export type UserUpdateType = Partial<Omit<UserType, 'role'>>;