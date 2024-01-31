import { Module } from '@nestjs/common';
import { ThemeController } from '@/modules/api/v1/theme/theme.controller';
import { ThemeService } from '@/modules/api/v1/theme/theme.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeSchema } from '@/db/mongoose/theme/theme.model';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    imports    : [
        MongooseModule.forFeature([
            { name: 'ThemeModel', schema: ThemeSchema },
        ]),
        ServicesModule,
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