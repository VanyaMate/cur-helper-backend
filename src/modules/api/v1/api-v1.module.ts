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
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';
import { TestsModule } from '@/modules/api/v1/tests/tests.module';
import { AdminThemesModule } from '@/modules/api/v1/admin/themes/admin-themes.module';
import { AdminTestsModule } from '@/modules/api/v1/admin/tests/admin-tests.module';
import {
    QuestionAnswerModule,
} from '@/modules/api/v1/question-answer/question-answer.module';
import {
    AdminQuestionsModule,
} from '@/modules/api/v1/admin/questions/admin-questions.module';


@Module({
    imports: [
        ThemeModule,
        TestModule,
        QuestionModule,
        ThemesModule,
        QuestionToTestModule,
        QuestionToThemeModule,
        TestPassingModule,
        AuthModule,
        UserModule,
        TestsModule,
        AdminThemesModule,
        AdminTestsModule,
        QuestionAnswerModule,
        AdminQuestionsModule,
    ],
})
export class ApiV1Module {

}