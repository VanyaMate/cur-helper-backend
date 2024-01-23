import { CreateThemeData } from '@/domain/theme/theme-service.interface';
import { Theme } from '@/domain/theme/theme.types';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Dto } from '@/domain/dto';


export class CreateThemeDto extends Dto<CreateThemeDto> implements CreateThemeData {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    additional?: string;

    @IsOptional()
    @IsString()
    body?: string;

    @IsOptional()
    @IsString()
    url?: string;
}