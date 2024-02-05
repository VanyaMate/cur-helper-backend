import { Module } from '@nestjs/common';
import {
    TestPassingController,
} from '@/modules/api/v1/test-passing/test-passing.controller';
import { TestPassingService } from '@/modules/api/v1/test-passing/test-passing.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [
        TestPassingController,
    ],
    providers  : [
        TestPassingService,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class TestPassingModule {
}