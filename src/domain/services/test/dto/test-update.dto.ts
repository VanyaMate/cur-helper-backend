import { Dto } from '@/domain/dto';
import { TestUpdateType } from '@/domain/test/test.types';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';


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