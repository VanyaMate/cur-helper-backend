import { Module } from '@nestjs/common';
import { ThemesService } from '@/modules/api/v1/themes/themes.service';
import { ThemesController } from '@/modules/api/v1/themes/themes.controller';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    imports    : [
        ServicesModule,
    ],
    providers  : [
        ThemesService,
    ],
    controllers: [
        ThemesController,
    ],
})
export class ThemesModule {

}