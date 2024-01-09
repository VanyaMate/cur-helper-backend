import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Theme, ThemeSchema } from './theme.model';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';


@Module({
    imports    : [
        MongooseModule.forFeature([
            { name: Theme.name, schema: ThemeSchema },
        ]),
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