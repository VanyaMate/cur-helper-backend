import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
    IAuthenticationService,
} from '@/domain/services/authentication/authentication-service.interface';
import {
    RegistrationDataType,
    LoginDataType,
} from '@/domain/services/authentication/authentication.types';
import { UserType } from '@/domain/services/user/user.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@/db/mongoose/user/user.model';
import {
    MongoAuthenticationService,
} from '@/domain/services/authentication/implementations/mongo/mongo-authentication.service';
import { HashService } from '@/modules/services/hash/hash.service';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import { RegistrationDto } from '@/domain/services/authentication/dto/registration.dto';
import { LoginDto } from '@/domain/services/authentication/dto/login.dto';
import { CookieAuthService } from '@/modules/api/v1/auth/cookie-auth.service';
import { Response } from 'express';
import { JwtService } from '@/modules/api/v1/auth/jwt.service';
import { UserJwtCodeService } from '@/modules/api/v1/auth/user-jwt-code.service';


@Injectable()
export class AuthService {
    private readonly _authService: IAuthenticationService;

    constructor (
        @InjectModel('UserModel') private readonly _userRepository: Model<UserModel>,
        private readonly _hashService: HashService,
        private readonly _converter: MongoConverterService,
        private readonly _dtoValidator: DtoValidatorService,
        private readonly _cookieService: CookieAuthService,
        private readonly _jwtService: JwtService,
        private readonly _userJwtCodeService: UserJwtCodeService,
    ) {
        this._authService = new MongoAuthenticationService(
            this._userRepository,
            this._hashService,
            this._converter.user,
        );
    }

    async registration (registrationData: RegistrationDataType, response: Response): Promise<UserType> {
        try {
            await this._dtoValidator.validate(new RegistrationDto(registrationData));
            const user: UserType = await this._authService.registration(registrationData);
            const code: string   = await this._userJwtCodeService.createFor(user.id);
            const jwt: string    = await this._jwtService.encode({
                userId: user.id,
                code,
            });
            this._cookieService.set(response, jwt);
            return user;
        } catch (e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async login (loginData: LoginDataType, response: Response): Promise<UserType> {
        try {
            await this._dtoValidator.validate(new LoginDto(loginData));
            const user: UserType = await this._authService.login(loginData);
            const code: string   = await this._userJwtCodeService.createFor(user.id);
            const jwt: string    = await this._jwtService.encode({
                userId: user.id,
                code,
            });
            this._cookieService.set(response, jwt);
            return user;
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async logout (response: Response): Promise<boolean> {
        await this._cookieService.remove(response);
        return true;
    }
}