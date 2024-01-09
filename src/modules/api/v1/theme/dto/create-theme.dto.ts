import { IsArray, IsOptional, IsString } from 'class-validator';


export class CreateThemeDto {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsString()
    parent: string;

    @IsOptional()
    @IsArray()
    children: string[];

    @IsOptional()
    @IsArray()
    tests: string[];
}