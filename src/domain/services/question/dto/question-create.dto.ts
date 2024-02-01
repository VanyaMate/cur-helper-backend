import { Dto } from '@/domain/dto';
import { QuestionCreateType } from '@/domain/question/question.types';
import { Complexity } from '@/domain/enums';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString, Validate,
} from 'class-validator';
import {
    IsQuestionAnswers,
} from '@/domain/validators/class-validator/is-question-answers.validator';
import {
    IsQuestionComplexity,
} from '@/domain/validators/class-validator/is-question-complexity.validator';
import { QuestionAnswerType } from '@/domain/answer/question-answer.types';


export class QuestionCreateDto extends Dto<QuestionCreateType> implements QuestionCreateType {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @Validate(IsQuestionAnswers)
    answers: QuestionAnswerType[];

    @IsBoolean()
    @IsOptional()
    enabled?: boolean;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    body?: string;

    @IsString()
    @IsOptional()
    @Validate(IsQuestionComplexity)
    complexity?: Complexity;

    @IsNumber()
    @IsOptional()
    points?: number;
}