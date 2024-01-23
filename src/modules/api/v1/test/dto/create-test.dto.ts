import { IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateTestDto {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    timeToPass: number;
}