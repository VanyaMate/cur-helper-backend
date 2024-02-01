import { Dto } from '@/domain/dto';
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
import { QuestionUpdateType } from '@/domain/services/question/question.types';
import { QuestionAnswerType } from '@/domain/services/answer/question-answer.types';


export class QuestionUpdateDto extends Dto<QuestionUpdateType> implements QuestionUpdateType {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsArray()
    @IsOptional()
    @Validate(IsQuestionAnswers)
    answers?: QuestionAnswerType[];

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