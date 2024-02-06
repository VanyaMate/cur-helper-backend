import { Filter, IConverter } from '@/domain/service.types';
import { IRoleService } from '@/domain/services/role/role-service.interface';
import { RoleCreateType, RoleType } from '../../role.types';
import { FilterQuery, Model } from 'mongoose';
import { RoleDocument, RoleModel } from '@/db/mongoose/role/role.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';


export class MongoRoleService implements IRoleService {
    constructor (
        private readonly _roleRepository: Model<RoleModel>,
        private readonly _roleConverter: IConverter<RoleDocument, RoleType>,
        private readonly _mongoFilterConverter: IConverter<Filter<RoleType>, FilterQuery<RoleModel>>,
    ) {
    }


    async create (data: RoleCreateType): Promise<RoleType> {
        const roleDocument: RoleDocument = await this._roleRepository.create(data);
        return this._roleConverter.to(roleDocument);
    }

    async read (data: Filter<RoleType>): Promise<RoleType> {
        const roleDocument: RoleDocument | null = await this._roleRepository.findOne(this._mongoFilterConverter.to(data));
        if (roleDocument) {
            return this._roleConverter.to(roleDocument);
        } else {
            throw NOT_FOUND;
        }
    }

    async update (id: string, data: Partial<RoleType>): Promise<RoleType> {
        const roleDocument: RoleDocument | null = await this._roleRepository.findById(id);
        await roleDocument.updateOne(data);
        return this._roleConverter.to(Object.assign(roleDocument, data));
    }

    async delete (id: string): Promise<boolean> {
        return !!(await this._roleRepository.deleteOne({ _id: id })).deletedCount;
    }

}