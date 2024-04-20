import { IsNumber, IsString } from "class-validator";
import { isFloat32Array } from "util/types";

export class CreateServiceDto {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;
    
}