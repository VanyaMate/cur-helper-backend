import { Module } from '@nestjs/common';
import { UsersController } from '@/modules/api/v1/users/users.controller';
import { UsersService } from '@/modules/api/v1/users/users.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [ UsersController ],
    providers  : [ UsersService ],
    imports    : [ ServicesModule ],
})
export class UsersModule {
}