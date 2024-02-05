import { IConverter } from '@/domain/service.types';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { UserType } from '@/domain/services/user/user.types';


export class MongoUserTypeConverter implements IConverter<UserDocument, UserType> {
    to (from: UserDocument): UserType {
        return {
            login    : from.login,
            email    : from.email,
            info     : {
                firstName: from.firstName,
                lastName : from.lastName,
            },
            role     : from.role ? {
                rights: from.role.rights,
                title : from.role.title,
            } : null,
            avatarUrl: from.avatarUrl,
        };
    }

    from (to: UserType): UserDocument {
        throw new Error('Method not implemented.');
    }

}