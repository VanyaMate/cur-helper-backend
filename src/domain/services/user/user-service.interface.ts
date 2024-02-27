import { ICRUD } from '@/domain/service.types';
import { UserCreateType, UserType, UserUpdateType } from '@vanyamate/cur-helper-types';


export interface IUserService extends ICRUD<UserType, UserCreateType, UserUpdateType, string> {
    changePassword (userId: string, newPassword: string): Promise<UserType>;

    changeRole (userId: string, newRoleId: string): Promise<UserType>;
}