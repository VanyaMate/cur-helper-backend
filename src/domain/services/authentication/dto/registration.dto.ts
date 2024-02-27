import { Dto } from '@/domain/dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegistrationDataType } from '@vanyamate/cur-helper-types';


export class RegistrationDto extends Dto<RegistrationDataType> implements RegistrationDataType {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}