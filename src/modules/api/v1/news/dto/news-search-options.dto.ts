import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {
    transformStringToNumber,
} from '@/domain/lib/class-transform/transform/transformStringToNumber';
import { Options } from '@vanyamate/cur-helper-types';
import { DomainNews } from '@vanyamate/cur-helper-types/types/news/DomainNews';


export class NewsSearchOptionsDto implements Options<DomainNews> {
    @Transform(transformStringToNumber)
    @IsNumber()
    @IsOptional()
    limit: number;

    @Transform(transformStringToNumber)
    @IsNumber()
    @IsOptional()
    offset: number;

    @IsArray()
    @IsOptional()
    sort: [];
}