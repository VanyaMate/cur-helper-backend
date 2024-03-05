import { Dto } from '@/domain/dto';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString, Validate,
} from 'class-validator';
import {
    IsQuestionComplexity,
} from '@/domain/validators/class-validator/is-question-complexity.validator';
import { Complexity, QuestionUpdateType } from '@vanyamate/cur-helper-types';


export class QuestionUpdateDto extends Dto<QuestionUpdateType> implements QuestionUpdateType {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    title?: string;

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