import { Type } from "class-transformer";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
import { IsNumber, IsString, ValidateNested, IsUUID, IsOptional } from "class-validator";

export class CreateAppointmentDto {

    @IsString()
    date: string; 

    @IsString()
    location: string;

    @IsString()
    hour: string;

    @IsString()
    description: string;

    @IsString()
    service_id: string;

    @ValidateNested()
    @Type(() => Client)
    client: Client

    @ValidateNested()
    @IsOptional()
    @Type(() => Professional)
    professional: Professional
    
}

