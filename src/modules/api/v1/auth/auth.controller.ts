import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/api/v1/auth/auth.service';
import { Response } from 'express';
import {
    LoginDataType,
    RegistrationDataType,
} from '@vanyamate/cur-helper-types';
import {
    HeaderVerifiedUserGuard,
} from '@/modules/guards/header/header-verified-user.guard';
import { IsUserGuard } from '@/modules/guards/header/is-user.guard';


@Controller('/api/v1/auth')
export class AuthController {
    constructor (
        private readonly _authService: AuthService,
    ) {
    }

    @Post('login')
    login (
        @Body() loginData: LoginDataType,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this._authService.login(loginData, response);
    }

    @Post('registration')
    registration (
        @Body() registrationData: RegistrationDataType,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this._authService.registration(registrationData, response);
    }

    @Post('logout')
    logout (@Res({ passthrough: true }) response: Response) {
        return this._authService.logout(response);
    }

    @Post('refresh')
    @UseGuards(IsUserGuard)
    refresh (
        @Req() request: Request,
    ) {
        return this._authService.refresh(request['user'], request['jwt-code']);
    }
}