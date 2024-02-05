import {
    TestPassingResults,
    TestPassingType,
} from '@/domain/services/test-passing/test-passing.types';
import { Create, With } from '@/domain/types';
import { RoleRules, RoleType } from '@/domain/services/role/role.types';


export type UserType = {
    login: string;
    avatarUrl: string;
}

export type UserInfo = {
    info: {
        firstName: string;
        lastName: string;
    }
}

export type UserTestPassing = {
    testPassing: With<TestPassingType, [ TestPassingResults ]>[];
}

export type UserRole = {
    role: RoleType;
}

export type UserRoleWithRules = {
    role: With<RoleType, [ RoleRules ]>
}

export type UserCreateType =
    Create<With<UserType, [ UserInfo ]>, 'login'>
    & { password: string };
export type UserUpdateType =
    Partial<With<UserType, [ UserInfo ]>>;