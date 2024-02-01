import { Module } from '@nestjs/common';
import { ThemeModule } from '@/modules/api/v1/theme/theme.module';
import { TestModule } from '@/modules/api/v1/test/test.module';
import { QuestionModule } from '@/modules/api/v1/question/question.module';


@Module({
    imports: [
        ThemeModule,
        TestModule,
        QuestionModule,
    ],
})
export class ApiV1Module {

}