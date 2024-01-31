import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ThemeCreateType } from '@/domain/theme/theme.types';
import { Dto } from '@/domain/dto';


export class ThemeCreateDto extends Dto<ThemeCreateType> implements ThemeCreateType {
    @IsString()
    @IsNotEmpty()
    publicId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsOptional()
    enabled?: boolean;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    additional?: string;

    @IsString()
    @IsOptional()
    body?: string;

    @IsString()
    @IsOptional()
    url?: string;
}