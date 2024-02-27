import { Dto } from '@/domain/dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoginDataType } from '@vanyamate/cur-helper-types';


export class LoginDto extends Dto<LoginDataType> {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    login?: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}