import { Module } from '@nestjs/common';
import {
    QuestionAnswerService,
} from '@/modules/api/v1/question-answer/question-answer.service';
import {
    QuestionAnswerController,
} from '@/modules/api/v1/question-answer/question-answer.controller';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';


@Module({
    providers  : [
        QuestionAnswerService,
    ],
    controllers: [
        QuestionAnswerController,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
    ],
})
export class QuestionAnswerModule {

}