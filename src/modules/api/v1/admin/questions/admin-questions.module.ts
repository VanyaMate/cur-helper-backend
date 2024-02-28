import { Module } from '@nestjs/common';
import {
    AdminQuestionsController,
} from '@/modules/api/v1/admin/questions/admin-questions.controller';
import {
    AdminQuestionsService,
} from '@/modules/api/v1/admin/questions/admin-questions.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [
        AdminQuestionsController,
    ],
    providers  : [
        AdminQuestionsService,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class AdminQuestionsModule {
}