import { Module } from '@nestjs/common';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';


@Module({
    providers: [
        DtoValidatorService,
    ],
    exports  : [
        DtoValidatorService,
    ],
})
export class ServicesModule {

}