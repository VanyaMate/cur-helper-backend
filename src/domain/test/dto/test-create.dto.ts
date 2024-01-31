import { Dto } from '@/domain/dto';
import { TestCreateType } from '@/domain/test/test.types';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


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