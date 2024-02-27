import { AuthorizationRightsType } from '@vanyamate/cur-helper-types';


export interface IAuthorizationService {
    authorizeRights (props: AuthorizationRightsType): Promise<boolean>;
}