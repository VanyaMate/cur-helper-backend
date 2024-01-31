import { Module } from '@nestjs/common';
import { ApiV1Module } from '@/modules/api/v1/api-v1.module';


@Module({
    imports: [
        ApiV1Module,
    ],
})
export class ApiModule {

}