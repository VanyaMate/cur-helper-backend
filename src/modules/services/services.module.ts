import { Module } from '@nestjs/common';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import { MongoModelsModule } from '@/modules/services/mongo/mongo-models.module';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import {
    MongoTestPassingTimeCheckSchedule,
} from '@/modules/services/mongo/schedule/mongo-test-passing-time-check-schedule';


@Module({
    imports  : [
        MongoModelsModule,
    ],
    providers: [
        DtoValidatorService,
        MongoConverterService,
        MongoTestPassingTimeCheckSchedule,
    ],
    exports  : [
        DtoValidatorService,
        MongoModelsModule,
        MongoConverterService,
    ],
})
export class ServicesModule {

}