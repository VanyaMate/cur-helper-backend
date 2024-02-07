import { IHashService } from '@/domain/services/hash/hash-service.interface';
import {
    HashFunction,
} from '@/domain/services/hash/implementations/bcrypt/bcrypt-hash.type';
import * as bc from 'bcrypt';


export class BcryptHashService implements IHashService {
    constructor (
        private readonly _hashSecretKey: string,
    ) {
    }

    validate (value: string, hash: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bc.compare(value, hash)
                .then(resolve)
                .catch(reject);
        });
    }

    hash (payload: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bc.hash(payload, parseInt(this._hashSecretKey) ?? 3, (err, encrypted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(encrypted);
                }
            });
        });
    }
}