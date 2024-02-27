import { Dto } from '@/domain/dto';
import { RoleUpdateType } from '@vanyamate/cur-helper-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';


export class RoleUpdateDto extends Dto<RoleUpdateType> implements RoleUpdateType {
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber()
    @IsOptional()
    rights?: number;
}