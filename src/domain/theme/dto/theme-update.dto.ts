import { IsOptional, IsString } from 'class-validator';
import { ThemeCreateType, ThemeUpdateType } from '@/domain/theme/theme.types';


export class ThemeUpdateDto implements ThemeUpdateType {
    constructor (_data: ThemeUpdateType) {
        this.id          = _data.id;
        this.title       = _data.title;
        this.description = _data.description;
        this.body        = _data.body;
    }

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    body: string;
}