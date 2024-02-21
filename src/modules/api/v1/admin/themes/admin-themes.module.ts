import { Module } from '@nestjs/common';
import {
    AdminThemesController,
} from '@/modules/api/v1/admin/themes/admin-themes.controller';
import { AdminThemesService } from '@/modules/api/v1/admin/themes/admin-themes.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [ AdminThemesController ],
    providers  : [ AdminThemesService ],
    imports    : [
        ServicesModule,
    ],
})
export class AdminThemesModule {

}