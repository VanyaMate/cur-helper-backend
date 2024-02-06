import { Dto } from '@/domain/dto';
import { LoginDataType } from '@/domain/services/authentication/authentication.types';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


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