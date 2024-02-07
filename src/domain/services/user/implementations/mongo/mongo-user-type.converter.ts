import { IConverter } from '@/domain/service.types';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { UserType } from '@/domain/services/user/user.types';
import { RoleDocument } from '@/db/mongoose/role/role.model';
import { RoleType } from '@/domain/services/role/role.types';


export class MongoUserTypeConverter implements IConverter<UserDocument, UserType> {
    constructor (
        private readonly _roleConverter: IConverter<RoleDocument, RoleType>,
    ) {
    }

    to (from: UserDocument): UserType {
        return {
            id       : from._id.toString(),
            login    : from.login,
            email    : from.email,
            firstName: from.firstName,
            lastName : from.lastName,
            role     : this._roleConverter.to(from.role),
            avatarUrl: from.avatarUrl,
        };
    }

    from (to: UserType): UserDocument {
        throw new Error('Method not implemented.');
    }

}