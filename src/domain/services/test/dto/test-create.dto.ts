import { Dto } from '@/domain/dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TestCreateType } from '@/domain/services/test/test.types';


export class TestCreateDto extends Dto<TestCreateType> implements TestCreateType {
    @IsString()
    @IsNotEmpty()
    themeId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

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