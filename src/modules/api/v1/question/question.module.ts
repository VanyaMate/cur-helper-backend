import { Module } from '@nestjs/common';
import { QuestionController } from '@/modules/api/v1/question/question.controller';
import { QuestionService } from '@/modules/api/v1/question/question.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';


@Module({
    controllers: [
        QuestionController,
    ],
    providers  : [
        QuestionService,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
    ],
})
export class QuestionModule {
}