import { Module } from '@nestjs/common';
import {
    AdminQuestionsController,
} from '@/modules/api/v1/admin/questions/admin-questions.controller';
import {
    AdminQuestionsService,
} from '@/modules/api/v1/admin/questions/admin-questions.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';


@Module({
    controllers: [
        AdminQuestionsController,
    ],
    providers  : [
        AdminQuestionsService,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
        UserModule,
    ],
})
export class AdminQuestionsModule {
}