import { Module } from '@nestjs/common';
import {
    AdminThemesController,
} from '@/modules/api/v1/admin/themes/admin-themes.controller';
import { AdminThemesService } from '@/modules/api/v1/admin/themes/admin-themes.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';


@Module({
    controllers: [ AdminThemesController ],
    providers  : [ AdminThemesService ],
    imports    : [
        ServicesModule,
        AuthModule,
    ],
})
export class AdminThemesModule {

}