import {
    LoginDataType,
    RegistrationDataType,
    UserType,
} from '@vanyamate/cur-helper-types';


export interface IAuthenticationService {
    registration (registrationData: RegistrationDataType): Promise<UserType>;

    login (loginData: LoginDataType): Promise<UserType>;
}