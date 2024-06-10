import { Module } from '@nestjs/common';
import {
    AdminTestsController,
} from '@/modules/api/v1/admin/tests/admin-tests.controller';
import { AdminTestsService } from '@/modules/api/v1/admin/tests/admin-tests.service';
import { ServicesModule } from '@/modules/services/services.module';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';
import { UserModule } from '@/modules/api/v1/user/user.module';


@Module({
    controllers: [
        AdminTestsController,
    ],
    providers  : [
        AdminTestsService,
    ],
    imports    : [
        ServicesModule,
        AuthModule,
        UserModule,
    ],
})
export class AdminTestsModule {

}