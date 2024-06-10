import { Module } from '@nestjs/common';
import { ServicesModule } from '@/modules/services/services.module';
import {
    QuestionToThemeController,
} from '@/modules/api/v1/question-to-theme/question-to-theme.controller';
import {
    QuestionToThemeService,
} from '@/modules/api/v1/question-to-theme/question-to-theme.service';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';


@Module({
    controllers: [
        QuestionToThemeController,
    ],
    providers  : [
        QuestionToThemeService,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
        UserModule,
    ],
})
export class QuestionToThemeModule {

}