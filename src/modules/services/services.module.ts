import { forwardRef, Module } from '@nestjs/common';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import { MongoModelsModule } from '@/modules/services/mongo/mongo-models.module';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import {
    MongoTestPassingTimeCheckSchedule,
} from '@/modules/services/mongo/schedule/mongo-test-passing-time-check-schedule';
import { HashService } from '@/modules/services/hash/hash.service';
import { TestPassingModule } from '@/modules/api/v1/test-passing/test-passing.module';
import { ErrorCallerService } from '@/modules/services/error/error-caller.service';
import {
    ErrorTypeConverter,
} from '@/modules/services/error/error-type-converter.service';


@Module({
    imports: [
        MongoModelsModule,
    ],
    providers: [
        DtoValidatorService,
        MongoConverterService,
        HashService,
        ErrorCallerService,
        ErrorTypeConverter,
    ],
    exports: [
        DtoValidatorService,
        MongoModelsModule,
        MongoConverterService,
        HashService,
        ErrorCallerService,
        ErrorTypeConverter,
    ],
})
export class ServicesModule {

}