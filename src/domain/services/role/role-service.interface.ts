import {
    ICRUD,
    RoleCreateType,
    RoleType,
    RoleUpdateType,
} from '@vanyamate/cur-helper-types';


export interface IRoleService extends ICRUD<RoleType, RoleCreateType, RoleUpdateType, string> {

}