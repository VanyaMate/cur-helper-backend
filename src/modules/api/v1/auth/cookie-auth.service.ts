import { Injectable } from '@nestjs/common';
import {
    ICookieAuthService,
} from '@/domain/services/cookie-auth/cookie-auth-service.interface';
import {
    CookieAuthService as DomainCookieAuthService,
} from '@/domain/services/cookie-auth/implementations/cookie-auth.service';
import { Response, Request } from 'express';


@Injectable()
export class CookieAuthService implements ICookieAuthService {
    private readonly _cookieAuthService: ICookieAuthService = new DomainCookieAuthService();

    set (response: Response, data: string): void {
        return this._cookieAuthService.set(response, data);
    }

    remove (response: Response): void {
        return this._cookieAuthService.remove(response);
    }

    get (request: Request): string {
        return this._cookieAuthService.get(request);
    }
}