import { Dto } from '@/domain/dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { TestUpdateType } from '@vanyamate/cur-helper-types';


export class TestUpdateDto extends Dto<TestUpdateType> implements TestUpdateType {
    @IsString()
    @IsOptional()
    themeId?: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsBoolean()
    @IsOptional()
    enabled?: boolean;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    timeToPass?: number;

    @IsNumber()
    @IsOptional()
    questionsAmount?: number;

    @IsNumber()
    @IsOptional()
    unsatisfactoryScore?: number;

    @IsNumber()
    @IsOptional()
    satisfactoryScore?: number;

    @IsNumber()
    @IsOptional()
    perfectScore?: number;
}