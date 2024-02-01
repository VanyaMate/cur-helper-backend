import { Injectable } from '@nestjs/common';
import { DtoValidator, IValidator } from '@/domain/dto.validator';


@Injectable()
export class DtoValidatorService implements IValidator {
    private readonly _validator = new DtoValidator();

    async validate<DtoType extends object> (data: DtoType): Promise<boolean> {
        return await this._validator.validate(data);
    }
}