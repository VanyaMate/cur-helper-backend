import { Dto } from '@/domain/dto';
import { validate, ValidationError } from 'class-validator';


export interface IDtoValidator {
    validate (data: Dto<any>): Promise<boolean>;
}

export class DtoValidator implements IDtoValidator {
    async validate (data: Dto<any>): Promise<boolean> {
        try {
            const errors: ValidationError[] = await validate(data);
            if (errors.length) {
                throw new Error('No valid data');
            } else {
                return true;
            }
        } catch (e) {
            throw new Error('No valid data');
        }
    }
}