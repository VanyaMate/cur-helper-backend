import { RoleDocument } from '@/db/mongoose/role/role.model';
import { IConverter, RoleType } from '@vanyamate/cur-helper-types';


export class MongoRoleConverter implements IConverter<RoleDocument, RoleType> {
    to (from: RoleDocument): RoleType {
        if (from) {
            return {
                id    : from._id.toString(),
                title : from.title,
                rights: from.rights,
            };
        } else {
            return null;
        }
    }

    from (to: RoleType): RoleDocument {
        throw new Error('Method not implemented.');
    }

}