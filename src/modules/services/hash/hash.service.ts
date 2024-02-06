import { IHashService } from '@/domain/services/hash/hash-service.interface';
import {
    BcryptHashService,
} from '@/domain/services/hash/implementations/bcrypt/bcrypt-hash.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';


@Injectable()
export class HashService implements IHashService {
    private readonly _hashService: IHashService;

    constructor (
        private readonly _config: ConfigService,
    ) {
        this._hashService = new BcryptHashService(
            this._config.get('HASH_SECRET_KEY'),
            hash,
        );
    }

    hash (payload: string): Promise<string> {
        return this._hashService.hash(payload);
    }
}