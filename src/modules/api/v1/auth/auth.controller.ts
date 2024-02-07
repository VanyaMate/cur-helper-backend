import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@/modules/api/v1/auth/auth.service';
import {
    LoginDataType,
    RegistrationDataType,
} from '@/domain/services/authentication/authentication.types';
import { Response } from 'express';


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
    refresh () {

    }
}