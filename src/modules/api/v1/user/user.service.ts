import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from '@/domain/services/user/user-service.interface';
import {
    MongoUserService,
} from '@/domain/services/user/implementations/mongo/mongo-user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@/db/mongoose/user/user.model';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import { HashService } from '@/modules/services/hash/hash.service';
import { RoleModel } from '@/db/mongoose/role/role.model';
import { Filter } from '@/domain/service.types';
import { UserType, UserCreateType } from '@/domain/services/user/user.types';


@Injectable()
export class UserService {
    private readonly _userService: IUserService;

    constructor (
        @InjectModel('UserModel') private readonly _userRepository: Model<UserModel>,
        @InjectModel('RoleModel') private readonly _roleRepository: Model<RoleModel>,
        private readonly _converter: MongoConverterService,
        private readonly _hashService: HashService,
    ) {
        this._userService = new MongoUserService(
            this._userRepository,
            this._converter.user,
            this._converter.filter,
            this._hashService,
            this._roleRepository,
        );
    }

    changePassword (userId: string, newPassword: string): Promise<UserType> {
        throw new Error('Method not implemented.');
    }

    changeRole (userId: string, newRoleId: string): Promise<UserType> {
        throw new Error('Method not implemented.');
    }

    create (data: UserCreateType): Promise<UserType> {
        throw new Error('Method not implemented.');
    }

    async read (data: Filter<UserType>): Promise<UserType> {
        try {
            return this._userService.read(data);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    update (id: string, data: Partial<Omit<UserType, 'role'>>): Promise<UserType> {
        throw new Error('Method not implemented.');
    }

    delete (id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}