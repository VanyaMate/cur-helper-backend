import { IHashService } from '@/domain/services/hash/hash-service.interface';
import {
    HashFunction,
} from '@/domain/services/hash/implementations/bcrypt/bcrypt-hash.type';


export class BcryptHashService implements IHashService {
    constructor (
        private readonly _hashSecretKey: string,
        private readonly _hashFunction: HashFunction,
    ) {
    }

    hash (payload: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this._hashFunction(payload, this._hashSecretKey, (err, encrypted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(encrypted);
                }
            });
        });
    }
}