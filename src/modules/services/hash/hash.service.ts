import { IHashService } from '@/domain/services/hash/hash-service.interface';
import {
    BcryptHashService,
} from '@/domain/services/hash/implementations/bcrypt/bcrypt-hash.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class HashService implements IHashService {
    private readonly _hashService: IHashService;

    constructor (
        private readonly _config: ConfigService,
    ) {
        this._hashService = new BcryptHashService(
            this._config.get('HASH_SECRET_KEY'),
        );
    }

    async hash (payload: string): Promise<string> {
        try {
            return await this._hashService.hash(payload);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async validate (token: string, hash: string): Promise<boolean> {
        try {
            return await this._hashService.validate(token, hash);
        } catch (e) {
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
        }
    }
}