import { Module } from '@nestjs/common';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import {
    MongoFilterConverterService,
} from '@/modules/services/mongo/mongo-filter-converter.service';


@Module({
    providers: [
        DtoValidatorService,
        MongoFilterConverterService,
    ],
    exports  : [
        DtoValidatorService,
        MongoFilterConverterService,
    ],
})
export class ServicesModule {

}