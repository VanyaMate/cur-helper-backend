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
import { UserSchema } from '@/db/mongoose/user/user.model';
import { RoleSchema } from '@/db/mongoose/role/role.model';
import {
    TestPassingSchema,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestRunningSchema,
} from '@/db/mongoose/test-running/test-running.model';
import {
    UserVerificationCodeSchema,
} from '@/db/mongoose/user-verification-code/user-verification-code.model';
import {
    TestPassingQuestionSchema,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import {
    UserJwtCodeSchema,
} from '@/db/mongoose/user-jwt-code/user-jwt-code.model';
import { NewsModel, NewsSchema } from '@/db/mongoose/news/news.model';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'ThemeModel', schema: ThemeSchema },

            { name: 'TestModel', schema: TestSchema },
            { name: 'TestPassingModel', schema: TestPassingSchema },
            { name: 'TestRunningModel', schema: TestRunningSchema },
            {
                name  : 'TestPassingQuestionModel',
                schema: TestPassingQuestionSchema,
            },

            { name: 'QuestionModel', schema: QuestionSchema },
            { name: 'QuestionAnswerModel', schema: QuestionAnswerSchema },
            { name: 'QuestionToTestModel', schema: QuestionToTestSchema },
            { name: 'QuestionToThemeModel', schema: QuestionToThemeSchema },

            { name: 'UserModel', schema: UserSchema },
            {
                name  : 'UserVerificationCodeModel',
                schema: UserVerificationCodeSchema,
            },
            { name: 'UserJwtCodeModel', schema: UserJwtCodeSchema },
            { name: 'RoleModel', schema: RoleSchema },
            { name: 'NewsModel', schema: NewsSchema },
        ]),
    ],
    exports: [
        MongooseModule,
    ],
})
export class MongoModelsModule {

}