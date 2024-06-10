import { Module } from '@nestjs/common';
import { TestController } from '@/modules/api/v1/test/test.controller';
import { TestService } from '@/modules/api/v1/test/test.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';


@Module({
    controllers: [
        TestController,
    ],
    providers  : [
        TestService,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
        UserModule,
    ],
})
export class TestModule {

}