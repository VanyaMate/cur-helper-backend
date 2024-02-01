import { Module } from '@nestjs/common';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import {
    MongoFilterConverterService,
} from '@/modules/services/mongo/mongo-filter-converter.service';
import { MongoModelsModule } from '@/modules/services/mongo/mongo-models.module';


@Module({
    imports  : [
        MongoModelsModule,
    ],
    providers: [
        DtoValidatorService,
        MongoFilterConverterService,
    ],
    exports  : [
        DtoValidatorService,
        MongoFilterConverterService,
        MongoModelsModule,
    ],
})
export class ServicesModule {

}