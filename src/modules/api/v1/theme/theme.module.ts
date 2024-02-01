import { Module } from '@nestjs/common';
import { ThemeController } from '@/modules/api/v1/theme/theme.controller';
import { ThemeService } from '@/modules/api/v1/theme/theme.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    imports    : [
        ServicesModule
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