import { Injectable } from '@nestjs/common';
import { DtoValidator, IValidator } from '@/domain/dto.validator';
import { ErrorCallerService } from '@/modules/services/error/error-caller.service';


@Injectable()
export class DtoValidatorService extends DtoValidator implements IValidator {
    constructor (
        readonly errorCaller: ErrorCallerService,
    ) {
        super(errorCaller);
    }
}