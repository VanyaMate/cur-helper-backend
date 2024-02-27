import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Dto } from '@/domain/dto';
import { ThemeUpdateType } from '@vanyamate/cur-helper-types';


export class ThemeUpdateDto extends Dto<ThemeUpdateType> implements ThemeUpdateType {
    @IsString()
    @IsOptional()
    publicId?: string;

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