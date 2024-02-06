import { Dto } from '@/domain/dto';
import { RoleType, RoleUpdateType } from '@/domain/services/role/role.types';
import { IsNumber, IsOptional, IsString } from 'class-validator';


export class RoleUpdateDto extends Dto<RoleUpdateType> implements RoleUpdateType {
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber()
    @IsOptional()
    rights?: number;
}