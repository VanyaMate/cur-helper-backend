import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CookieAuthService } from '@/modules/api/v1/auth/cookie-auth.service';
import { JwtService } from '@/modules/api/v1/auth/jwt.service';
import { Reflector } from '@nestjs/core';
import { AccessFor } from '@/modules/decorators/access-for.decorator';
import { UserService } from '@/modules/api/v1/user/user.service';
import { UserType } from '@/domain/services/user/user.types';
import { JwtUserType } from '@/domain/services/jwt/jwt-user-data.types';


@Injectable()
export class AccessGuard implements CanActivate {
    constructor (
        private readonly _cookieAuthService: CookieAuthService,
        private readonly _jwtService: JwtService,
        private readonly _reflector: Reflector,
        private readonly _userService: UserService,
    ) {
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const accessList: number[] | null = this._reflector.get(AccessFor, context.getHandler());
        if (!accessList) {
            return true;
        }

        const request: Request  = context.switchToHttp().getRequest();
        const token: string     = this._cookieAuthService.get(request);
        const data: JwtUserType = await this._jwtService.decode<JwtUserType>(token);
        const user: UserType    = await this._userService.read({
            id: {
                value: data.userId,
                type : 'equal',
            },
        });
        if (user.role === null) {
            return false;
        } else {
            return accessList.every((rights) => rights >> user.role.rights);
        }
    }
}