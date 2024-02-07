import {
    ICookieAuthService,
} from '@/domain/services/cookie-auth/cookie-auth-service.interface';
import { Response, Request } from 'express';


export class CookieAuthService implements ICookieAuthService {
    private readonly _COOKIE_NAME: string = 'AUTH_TOKEN';
    private readonly _MONTH: number       = 1000 * 60 * 60 * 24 * 30;

    set (response: Response, data: string): void {
        response.cookie(this._COOKIE_NAME, data, {
            maxAge  : this._MONTH,
            httpOnly: true,
        });
    }

    remove (response: Response): void {
        response.clearCookie(this._COOKIE_NAME);
    }

    get (request: Request): string {
        const data: string | undefined = request.cookies[this._COOKIE_NAME];
        return data ? data : '';
    }
}