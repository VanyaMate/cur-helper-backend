import { Module } from '@nestjs/common';
import {
    QuestionToTestController,
} from '@/modules/api/v1/question-to-test/question-to-test.controller';
import {
    QuestionToTestService,
} from '@/modules/api/v1/question-to-test/question-to-test.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';


@Module({
    controllers: [
        QuestionToTestController,
    ],
    providers  : [
        QuestionToTestService,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
        UserModule,
    ],
})
export class QuestionToTestModule {

}