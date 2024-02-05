import {
    UserType,
} from '@/domain/services/user/user.types';
import {
    LoginDataType,
    RegistrationDataType,
} from '@/domain/services/authentication/authentication.types';


export interface IAuthenticationService {
    registration (registrationData: RegistrationDataType): Promise<UserType>;

    login (loginData: LoginDataType): Promise<UserType>;
}