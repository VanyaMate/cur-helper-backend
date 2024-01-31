import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ThemeCreateType } from '@/domain/theme/theme.types';


export class ThemeCreateDto implements ThemeCreateType {
    constructor (_data: ThemeCreateType) {
        this.id          = _data.id;
        this.title       = _data.title;
        this.description = _data.description;
        this.body        = _data.body;
    }

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    body: string;
}