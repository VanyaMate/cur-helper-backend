import { Complexity } from '@vanyamate/cur-helper-types';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';


@ValidatorConstraint({ name: 'IsQuestionAnswers', async: false })
export class IsQuestionComplexity implements ValidatorConstraintInterface {
    validate (value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        switch (value) {
            case Complexity.EASY:
            case Complexity.MEDIUM:
            case Complexity.DIFFICULT:
                return true;
            default:
                return false;
        }
    }

    defaultMessage (validationArguments?: ValidationArguments): string {
        return `Неправильный формат сложности`;
    }
}