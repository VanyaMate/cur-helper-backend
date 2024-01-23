import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Theme,
    ThemeSchema,
} from '../../../../domain/theme/implementations/mongo/mongo-theme.model';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { Test, TestSchema } from '@/domain/test/implementations/mongo/mongo-test.model';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Theme.name, schema: ThemeSchema },
            { name: Test.name, schema: TestSchema },
        ]),
    ],
    controllers: [
        ThemeController,
    ],
    providers: [
        ThemeService,
    ],
})
export class ThemeModule {

}