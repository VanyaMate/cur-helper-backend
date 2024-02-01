import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';


@ValidatorConstraint({ name: 'IsQuestionAnswers', async: false })
export class IsQuestionAnswers implements ValidatorConstraintInterface {
    validate (value: any[], validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return Array.isArray(value) && value.every((answer) => {
            return (
                typeof answer['title'] === 'string' &&
                typeof answer['correct'] === 'boolean' &&
                answer['description'] ? typeof answer['description'] === 'string' : true
            );
        });
    }

    defaultMessage (validationArguments?: ValidationArguments): string {
        return `Неправильный формат ответов`;
    }
}