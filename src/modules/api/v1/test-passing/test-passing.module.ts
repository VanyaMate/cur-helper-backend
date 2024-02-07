import { Module } from '@nestjs/common';
import {
    TestPassingController,
} from '@/modules/api/v1/test-passing/test-passing.controller';
import { TestPassingService } from '@/modules/api/v1/test-passing/test-passing.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';


@Module({
    controllers: [
        TestPassingController,
    ],
    providers  : [
        TestPassingService,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
        UserModule,
    ],
})
export class TestPassingModule {
}