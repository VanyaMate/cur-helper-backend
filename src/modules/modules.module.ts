import { Module } from '@nestjs/common';
import { ServicesModule } from '@/modules/services/services.module';
import { ApiModule } from '@/modules/api/api.module';
import { CronServicesModule } from '@/modules/services/cron-services.module';


@Module({
    imports: [
        ApiModule,
        ServicesModule,
        CronServicesModule,
    ],
})
export class ModulesModule {

}