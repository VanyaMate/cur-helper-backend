import {
    AuthorizationRightsType,
} from '@/domain/services/authorization/authorization.types';


export interface IAuthorizationService {
    authorizeRights (props: AuthorizationRightsType): Promise<boolean>;
}