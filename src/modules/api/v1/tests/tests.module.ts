import { Module } from '@nestjs/common';
import { TestsService } from '@/modules/api/v1/tests/tests.service';
import { TestsController } from '@/modules/api/v1/tests/tests.controller';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    providers  : [
        TestsService,
    ],
    controllers: [
        TestsController,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class TestsModule {

}