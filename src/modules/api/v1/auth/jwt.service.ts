import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IJwtService } from '@/domain/services/jwt/jwt-service.interface';
import {
    DomainJwtService as DomainJwtService,
} from '@/domain/services/jwt/implementations/domain-jwt-service';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';


// TODO: Обработка ошибок
@Injectable()
export class JwtService {
    private readonly _jwtService: IJwtService;

    constructor (
        private readonly _configService: ConfigService,
    ) {
        this._jwtService = new DomainJwtService(
            this._configService.get('JWT_SECRET_KEY'),
            verify,     // import
            sign,       // import
        );
    }

    async encode (payload: any): Promise<string> {
        try {
            return await this._jwtService.encode(payload);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async decode<T> (token: string): Promise<T> {
        try {
            return await this._jwtService.decode<T>(token);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}