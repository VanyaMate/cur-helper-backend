import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Complexity } from '@/domain/enums';


@ValidatorConstraint({ name: 'IsQuestionAnswers', async: false })
export class IsQuestionComplexity implements ValidatorConstraintInterface {
    validate (value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        console.log(value);
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