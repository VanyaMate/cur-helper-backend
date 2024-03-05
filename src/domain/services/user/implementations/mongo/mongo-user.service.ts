import { IUserService } from '@/domain/services/user/user-service.interface';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument, UserModel } from '@/db/mongoose/user/user.model';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import { IHashService } from '@/domain/services/hash/hash-service.interface';
import { RoleDocument, RoleModel } from '@/db/mongoose/role/role.model';
import {
    Filter,
    IConverter,
    UserCreateType,
    UserType,
} from '@vanyamate/cur-helper-types';


export class MongoUserService implements IUserService {
    constructor (
        private readonly _userRepository: Model<UserModel>,
        private readonly _userConverter: IConverter<UserDocument, UserType>,
        private readonly _mongoFilterConverter: IConverter<Filter<UserType>, FilterQuery<UserModel>>,
        private readonly _hashService: IHashService,
        private readonly _roleRepository: Model<RoleModel>,
    ) {
    }

    async changePassword (userId: string, newPassword: string): Promise<UserType> {
        const userDocument: UserDocument = await this._userRepository.findById(userId);
        if (userDocument) {
            const passwordHash: string = await this._hashService.hash(newPassword);
            await userDocument.updateOne({ password: passwordHash });
            return this._userConverter.to(userDocument);
        }

        throw NOT_FOUND;
    }

    async changeRole (userId: string, newRoleId: string): Promise<UserType> {
        // TODO: Optimize
        const userDocument: UserDocument = await this._userRepository.findById(userId);
        const roleDocument: RoleDocument = await this._roleRepository.findById(newRoleId);
        if (userDocument) {
            await userDocument.updateOne({ roleId: roleDocument._id });
            return this._userConverter.to(userDocument);
        }

        throw NOT_FOUND;
    }

    async create (data: UserCreateType): Promise<UserType> {
        const userDocument: UserDocument = await this._userRepository.create(data);
        return this._userConverter.to(userDocument);
    }

    async read (data: Filter<UserType>): Promise<UserType> {
        const userDocument: UserDocument | null = await this._userRepository.findOne(this._mongoFilterConverter.to(data));
        if (userDocument) {
            return this._userConverter.to(userDocument);
        } else {
            throw NOT_FOUND;
        }
    }

    async update (id: string, data: Partial<Omit<UserType, 'role'>>): Promise<UserType> {
        const userDocument: UserDocument | null = await this._userRepository.findById(id);
        if (userDocument) {
            await userDocument.updateOne(data);
            return this._userConverter.to(Object.assign(userDocument, data));
        } else {
            throw NOT_FOUND;
        }
    }

    async delete (id: string): Promise<boolean> {
        return !!(await this._userRepository.deleteOne({ _id: id })).deletedCount;
    }
}