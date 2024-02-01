import { Module } from '@nestjs/common';
import { QuestionController } from '@/modules/api/v1/question/question.controller';
import { QuestionService } from '@/modules/api/v1/question/question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from '@/db/mongoose/question/question.model';
import {
    QuestionAnswerSchema,
} from '@/db/mongoose/question-answer/question-answer.model';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [
        QuestionController,
    ],
    providers  : [
        QuestionService,
    ],
    imports    : [
        MongooseModule.forFeature([
            { name: 'QuestionModel', schema: QuestionSchema },
            { name: 'QuestionAnswerModel', schema: QuestionAnswerSchema },
        ]),
        ServicesModule,
    ],
})
export class QuestionModule {
}