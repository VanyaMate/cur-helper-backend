import {
    IAuthorizationService,
} from '@/domain/services/authorization/authorization-service.interface';
import { AuthorizationRightsType } from '@vanyamate/cur-helper-types';


export class AuthorizationService implements IAuthorizationService {
    async authorizeRights (props: AuthorizationRightsType): Promise<boolean> {
        return props.requestedRights.every((requested) => (props.rights & requested) === requested);
    }
}