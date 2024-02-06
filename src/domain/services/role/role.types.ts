import { Create } from '@/domain/types';


export type RoleType = {
    id: string;
    title: string;
    rights: number;
}

export type RoleCreateType = Create<RoleType, 'title' | 'rights'>
export type RoleUpdateType = Partial<RoleType>;