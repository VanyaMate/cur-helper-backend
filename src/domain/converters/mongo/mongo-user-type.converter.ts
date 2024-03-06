import { UserDocument } from '@/db/mongoose/user/user.model';
import { RoleDocument } from '@/db/mongoose/role/role.model';
import { IConverter, UserType } from '@vanyamate/cur-helper-types';
import { RoleType } from '@vanyamate/cur-helper-types';
import { IMongoUserConverter } from '@/domain/converters/mongo/mongo-converters.types';


export class MongoUserTypeConverter implements IMongoUserConverter {
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
            verified : from.verified,
            role     : this._roleConverter.to(from.role),
            avatarUrl: from.avatarUrl,
        };
    }

    from (to: UserType): UserDocument {
        throw new Error('Method not implemented.');
    }

}