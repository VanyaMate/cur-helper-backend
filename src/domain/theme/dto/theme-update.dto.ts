import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ThemeUpdateType } from '@/domain/theme/theme.types';
import { Dto } from '@/domain/dto';


export class ThemeUpdateDto extends Dto<ThemeUpdateType> implements ThemeUpdateType {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    title?: string;

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