import { Module } from '@nestjs/common';
import { UserService } from '@/modules/api/v1/user/user.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    providers: [
        UserService,
    ],
    exports  : [
        UserService,
    ],
    imports  : [
        ServicesModule,
    ],
})
export class UserModule {
}