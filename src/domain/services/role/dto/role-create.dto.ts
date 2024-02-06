import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from '@/domain/dto';
import { RoleCreateType } from '@/domain/services/role/role.types';


export class RoleCreateDto extends Dto<RoleCreateType> implements RoleCreateType {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    rights: number;
}