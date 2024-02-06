import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/api/v1/auth/auth.service';
import { AuthController } from '@/modules/api/v1/auth/auth.controller';
import { ServicesModule } from '@/modules/services/services.module';
import { ConfigModule } from '@nestjs/config';
import { CookieAuthService } from '@/modules/api/v1/auth/cookie-auth.service';


@Module({
    providers  : [
        AuthService,
        CookieAuthService,
    ],
    controllers: [
        AuthController,
    ],
    imports    : [
        ServicesModule,
        ConfigModule,
    ],
})
export class AuthModule {
}