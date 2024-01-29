import { Module } from '@nestjs/common';
import { TestController } from '@/modules/api/v1/test/test.controller';
import { TestService } from '@/modules/api/v1/test/test.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModel, TestSchema } from '@/db/mongoose/test/test.model';
import { ThemeModel, ThemeSchema } from '@/db/mongoose/theme/theme.model';
import { QuestionModel, QuestionSchema } from '@/db/mongoose/question/question.model';
import {
    QuestionToTestModel, QuestionToTestSchema,
} from '@/db/mongoose/question-to-test/question-to-test.model';


@Module({
    controllers: [
        TestController,
    ],
    providers  : [
        TestService,
    ],
    imports    : [
        MongooseModule.forFeature([
            { name: TestModel.name, schema: TestSchema },
            { name: ThemeModel.name, schema: ThemeSchema },
            { name: QuestionModel.name, schema: QuestionSchema },
            { name: QuestionToTestModel.name, schema: QuestionToTestSchema },
        ]),
    ],
})
export class TestModule {

}