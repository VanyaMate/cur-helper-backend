import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@/modules/api/v1/auth/jwt.service';
import { Request, Response } from 'express';
import { JwtUserType } from '@vanyamate/cur-helper-types';


@Injectable()
export class UserHeaderMiddleware implements NestMiddleware {
    constructor (
        private readonly _jwtService: JwtService,
    ) {
    }

    async use (request: Request, response: Response, next: (error?: any) => void) {
        try {
            const token: string = request.headers.authorization ?? '';
            if (!token) {
                next();
                return;
            }
            const data: JwtUserType = await this._jwtService.decode<JwtUserType>(token);
            request['user-jwt-data'] = data;
            next();
        } catch (e) {
            next();
        }
    }

}