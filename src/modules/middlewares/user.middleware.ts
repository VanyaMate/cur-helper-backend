import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtUserType } from '@/domain/services/jwt/jwt-user-data.types';
import { CookieAuthService } from '@/modules/api/v1/auth/cookie-auth.service';
import { JwtService } from '@/modules/api/v1/auth/jwt.service';


@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor (
        private readonly _cookieAuthService: CookieAuthService,
        private readonly _jwtService: JwtService,
    ) {
    }

    async use (request: Request, response: Response, next: (error?: any) => void) {
        try {
            const token: string = this._cookieAuthService.get(request);
            if (!token) {
                // TODO: TEmp
                // request['user-jwt-data'] = { userId: '65c2dcccbe17e25e6a5205ca' };
                next();
                return;
            }
            const data: JwtUserType  = await this._jwtService.decode<JwtUserType>(token);
            request['user-jwt-data'] = data;
            next();
        } catch (e) {
            this._cookieAuthService.remove(response);
            next();
        }
    }

}