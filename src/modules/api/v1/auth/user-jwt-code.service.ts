import { Injectable } from '@nestjs/common';
import {
    IUserJwtCodeService,
} from '@/domain/services/user-jwt-code/user-jwt-code-service.interface';
import { Model } from 'mongoose';
import { UserJwtCodeModel } from '@/db/mongoose/user-jwt-code/user-jwt-code.model';
import {
    MongoUserJwtCodeService,
} from '@/domain/services/user-jwt-code/implementations/mongo/mongo-user-jwt-code.service';
import { v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';


// TODO: Обработка ошибок
@Injectable()
export class UserJwtCodeService {
    private readonly _userJwtCodeService: IUserJwtCodeService;

    constructor (
        @InjectModel('UserJwtCodeModel') private readonly _userJwtCodeRepository: Model<UserJwtCodeModel>
    ) {
        this._userJwtCodeService = new MongoUserJwtCodeService(
            this._userJwtCodeRepository,
            v4, // import
        );
    }

    createFor (userId: string): Promise<string> {
        return this._userJwtCodeService.createFor(userId);
    }

    updateFor (userId: string): Promise<string> {
        return this._userJwtCodeService.updateFor(userId);
    }

    readForUser (userId: string): Promise<string> {
        return this._userJwtCodeService.readForUser(userId);
    }

    deleteForUser (userId: string): Promise<boolean> {
        return this._userJwtCodeService.deleteForUser(userId);
    }
}