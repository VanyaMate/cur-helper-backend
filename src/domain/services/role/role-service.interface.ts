import { ICRUD } from '@/domain/service.types';
import {
    RoleCreateType,
    RoleType,
    RoleUpdateType,
} from '@/domain/services/role/role.types';


export interface IRoleService extends ICRUD<RoleType, RoleCreateType, RoleUpdateType, string> {

}