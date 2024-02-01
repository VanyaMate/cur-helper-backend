import { validate, ValidationError } from 'class-validator';


export interface IValidator {
    validate (data: any): Promise<boolean>;
}

export class DtoValidator implements IValidator {
    async validate<DtoType extends object> (data: DtoType): Promise<boolean> {
        try {
            const errors: ValidationError[] = await validate(data);
            if (errors.length) {
                throw errors;
            } else {
                return true;
            }
        } catch (e) {
            throw e;
        }
    }
}