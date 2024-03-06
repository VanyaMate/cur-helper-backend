import { validate, ValidationError } from 'class-validator';
import { IErrorCaller } from '@vanyamate/cur-helper-types';


export interface IValidator {
    validate (data: any): Promise<boolean>;
}

export class DtoValidator implements IValidator {
    constructor (
        private readonly _errorCaller: IErrorCaller,
    ) {
    }

    async validate<DtoType extends object> (data: DtoType): Promise<boolean> {
        const errors: ValidationError[] = await validate(data);
        if (errors.length) {
            throw this._errorCaller.noValidData(errors.map((error) => ({
                target  : error.property,
                messages: Object.keys(error.constraints).map((key) => error.constraints[key]),
            })));
        } else {
            return true;
        }
    }
}