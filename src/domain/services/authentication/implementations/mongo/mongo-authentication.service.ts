import {
    IAuthenticationService,
} from '@/domain/services/authentication/authentication-service.interface';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from '@/db/mongoose/user/user.model';
import { IHashService } from '@/domain/services/hash/hash-service.interface';
import { IConverter } from '@/domain/service.types';
import {
    LoginDataType,
    RegistrationDataType,
    UserType,
} from '@vanyamate/cur-helper-types';


export class MongoAuthenticationService implements IAuthenticationService {
    constructor (
        private readonly _userRepository: Model<UserModel>,
        private readonly _hashService: IHashService,
        private readonly _userConverter: IConverter<UserDocument, UserType>,
    ) {
    }

    async registration (registrationData: RegistrationDataType): Promise<UserType> {
        const createdUser: UserDocument = await this._userRepository.findOne({
            $or: [
                {
                    login: {
                        $regex: new RegExp(`^${registrationData.login}$`, 'i'),
                    },
                },
                {
                    email: {
                        $regex: new RegExp(`^${registrationData.email}$`, 'i'),
                    },
                },
            ],
        });
        if (createdUser) {
            throw 'Такой пользователь уже существует';
        }

        const passwordHash: string = await this._hashService.hash(registrationData.password);
        const user: UserDocument   = await this._userRepository.create({
            email   : registrationData.email,
            login   : registrationData.login,
            password: passwordHash,
        });

        return this._userConverter.to(user);
    }

    async login (loginData: LoginDataType): Promise<UserType> {
        let user: UserDocument | null = null;
        if ('login' in loginData) {
            user = await this._userRepository.findOne({
                login: loginData.login,
            });
        } else {
            user = await this._userRepository.findOne({
                email: loginData.email,
            });
        }

        if (!user) {
            throw 'Такого пользователя не существует';
        }

        const valid: boolean = await this._hashService.validate(loginData.password, user.password);
        if (valid) {
            return this._userConverter.to(user);
        } else {
            throw 'Неправильный пароль';
        }
    }
}