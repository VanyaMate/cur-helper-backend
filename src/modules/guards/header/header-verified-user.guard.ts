import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { JwtUserType } from '@/domain/services/jwt/jwt-user-data.types';
import { UserType } from '@/domain/services/user/user.types';
import { JwtService } from '@/modules/api/v1/auth/jwt.service';
import { UserService } from '@/modules/api/v1/user/user.service';


export class HeaderVerifiedUserGuard implements CanActivate {
    constructor (
        private readonly _jwtService: JwtService,
        private readonly _userService: UserService,
    ) {
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token: string    = request.headers.authorization;
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