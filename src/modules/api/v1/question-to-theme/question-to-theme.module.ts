import { Module } from '@nestjs/common';
import { ServicesModule } from '@/modules/services/services.module';
import {
    QuestionToThemeController,
} from '@/modules/api/v1/question-to-theme/question-to-theme.controller';
import {
    QuestionToThemeService,
} from '@/modules/api/v1/question-to-theme/question-to-theme.service';


@Module({
    controllers: [
        QuestionToThemeController,
    ],
    providers  : [
        QuestionToThemeService,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class QuestionToThemeModule {

}