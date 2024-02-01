import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeSchema } from '@/db/mongoose/theme/theme.model';
import { TestSchema } from '@/db/mongoose/test/test.model';
import { QuestionSchema } from '@/db/mongoose/question/question.model';
import {
    QuestionAnswerSchema,
} from '@/db/mongoose/question-answer/question-answer.model';
import {
    QuestionToTestSchema,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import {
    QuestionToThemeSchema,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'ThemeModel', schema: ThemeSchema },
            { name: 'TestModel', schema: TestSchema },
            { name: 'QuestionModel', schema: QuestionSchema },
            { name: 'QuestionAnswerModel', schema: QuestionAnswerSchema },
            { name: 'QuestionToTestModel', schema: QuestionToTestSchema },
            { name: 'QuestionToThemeModel', schema: QuestionToThemeSchema },
        ]),
    ],
    exports: [
        MongooseModule,
    ],
})
export class MongoModelsModule {

}