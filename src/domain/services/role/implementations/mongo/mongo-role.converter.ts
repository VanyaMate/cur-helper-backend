import { IConverter } from '@/domain/service.types';
import { RoleDocument } from '@/db/mongoose/role/role.model';
import { RoleType } from '@/domain/services/role/role.types';


export class MongoRoleConverter implements IConverter<RoleDocument, RoleType> {
    to (from: RoleDocument): RoleType {
        return {
            id    : from._id.toString(),
            title : from.title,
            rights: from.rights,
        };
    }

    from (to: RoleType): RoleDocument {
        throw new Error('Method not implemented.');
    }

}