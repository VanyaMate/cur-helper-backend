import { Module } from '@nestjs/common';
import { ServicesModule } from '@/modules/services/services.module';
import { ApiModule } from '@/modules/api/api.module';


@Module({
    imports: [
        ApiModule,
        ServicesModule,
    ],
})
export class ModulesModule {

}