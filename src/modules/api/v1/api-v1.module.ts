import { Module } from '@nestjs/common';
import { ThemeModule } from '@/modules/api/v1/theme/theme.module';
import { TestModule } from '@/modules/api/v1/test/test.module';
import { QuestionModule } from '@/modules/api/v1/question/question.module';
import { ThemesModule } from '@/modules/api/v1/themes/themes.module';
import {
    QuestionToTestModule,
} from '@/modules/api/v1/question-to-test/question-to-test.module';
import {
    QuestionToThemeModule,
} from '@/modules/api/v1/question-to-theme/question-to-theme.module';
import { TestPassingModule } from '@/modules/api/v1/test-passing/test-passing.module';


@Module({
    imports: [
        ThemeModule,
        TestModule,
        QuestionModule,
        ThemesModule,
        QuestionToTestModule,
        QuestionToThemeModule,
        TestPassingModule,
    ],
})
export class ApiV1Module {

}