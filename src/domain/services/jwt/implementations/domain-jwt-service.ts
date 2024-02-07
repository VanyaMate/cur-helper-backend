import { IJwtService } from '@/domain/services/jwt/jwt-service.interface';
import { verify, sign } from 'jsonwebtoken';


export type JwtVerifyFunction = typeof verify;
export type JwtSignFunction = typeof sign;

export class DomainJwtService implements IJwtService {
    constructor (
        private readonly _secretKey: string,
        private readonly _verifyFunction: JwtVerifyFunction,
        private readonly _signFunction: JwtSignFunction,
    ) {
    }

    async encode (payload: any): Promise<string> {
        return this._signFunction(payload, this._secretKey, {
            expiresIn: '10s',
        });
    }

    async decode<T> (token: string): Promise<T> {
        return this._verifyFunction(token, this._secretKey) as T;
    }
}