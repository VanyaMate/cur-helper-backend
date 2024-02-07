import {
    IUserJwtCodeService,
} from '@/domain/services/user-jwt-code/user-jwt-code-service.interface';
import { Model } from 'mongoose';
import { NOT_FOUND } from '@/domain/exceptions/errors';
import {
    UserJwtCodeDocument,
    UserJwtCodeModel,
} from '@/db/mongoose/user-jwt-code/user-jwt-code.model';


export type UserCodeGenerateFunction = () => string;

export class MongoUserJwtCodeService implements IUserJwtCodeService {
    constructor (
        private readonly _codeRepository: Model<UserJwtCodeModel>,
        private readonly _uuid: UserCodeGenerateFunction,
    ) {
    }

    async createFor (userId: string): Promise<string> {
        const created: UserJwtCodeDocument = await this._codeRepository.findOne({ userId });
        if (created) {
            return created.jwtCode;
        } else {
            const jwtCode: string = this._uuid();
            await this._codeRepository.create({ userId, jwtCode });
            return jwtCode;
        }
    }

    async updateFor (userId: string): Promise<string> {
        const jwtCode: string = this._uuid();
        await this._codeRepository.updateOne({ userId }, { jwtCode });
        return jwtCode;
    }

    async readForUser (userId: string): Promise<string> {
        const codeDocument: UserJwtCodeDocument = await this._codeRepository.findOne({ userId });
        if (codeDocument) {
            return codeDocument.jwtCode;
        } else {
            throw NOT_FOUND;
        }
    }

    async deleteForUser (userId: string): Promise<boolean> {
        return !!(await this._codeRepository.deleteOne({ userId })).deletedCount;
    }
}