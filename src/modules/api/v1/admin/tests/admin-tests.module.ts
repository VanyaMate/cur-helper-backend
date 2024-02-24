import { Module } from '@nestjs/common';
import {
    AdminTestsController,
} from '@/modules/api/v1/admin/tests/admin-tests.controller';
import { AdminTestsService } from '@/modules/api/v1/admin/tests/admin-tests.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [
        AdminTestsController,
    ],
    providers  : [
        AdminTestsService,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class AdminTestsModule {

}