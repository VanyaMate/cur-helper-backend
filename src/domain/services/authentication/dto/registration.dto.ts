import { Dto } from '@/domain/dto';
import {
    RegistrationDataType,
} from '@/domain/services/authentication/authentication.types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


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