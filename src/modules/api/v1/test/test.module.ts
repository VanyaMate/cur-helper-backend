import { Module } from '@nestjs/common';
import { TestController } from '@/modules/api/v1/test/test.controller';
import { TestService } from '@/modules/api/v1/test/test.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [
        TestController,
    ],
    providers  : [
        TestService,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class TestModule {

}