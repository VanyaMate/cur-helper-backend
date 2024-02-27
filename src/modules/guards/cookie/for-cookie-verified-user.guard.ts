import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { CookieAuthService } from '@/modules/api/v1/auth/cookie-auth.service';
import { JwtService } from '@/modules/api/v1/auth/jwt.service';
import { UserService } from '@/modules/api/v1/user/user.service';
import { Request } from 'express';
import { JwtUserType, UserType } from '@vanyamate/cur-helper-types';


@Injectable()
export class ForCookieVerifiedUser implements CanActivate {
    constructor (
        private readonly _cookieAuthService: CookieAuthService,
        private readonly _jwtService: JwtService,
        private readonly _userService: UserService,
    ) {
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token: string    = this._cookieAuthService.get(request);
        if (!token) {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }
        const data: JwtUserType = await this._jwtService.decode<JwtUserType>(token);
        const user: UserType    = await this._userService.read({
            id: {
                value: data.userId,
                type : 'equal',
            },
        });
        request['user']         = user;
        return user.verified;
    }
}