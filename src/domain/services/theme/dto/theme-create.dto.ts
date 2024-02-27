import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Dto } from '@/domain/dto';
import { ThemeCreateType } from '@vanyamate/cur-helper-types';


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