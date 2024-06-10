import { Module } from '@nestjs/common';
import { ThemeController } from '@/modules/api/v1/theme/theme.controller';
import { ThemeService } from '@/modules/api/v1/theme/theme.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';


@Module({
    imports    : [
        ServicesModule,
        AuthModule,
        UserModule,
    ],
    controllers: [
        ThemeController,
    ],
    providers  : [
        ThemeService,
    ],
})
export class ThemeModule {

}