import { Type } from "class-transformer";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateReviewDto {

    @IsNumber()
    score: number;

    @IsString()
    comment: string;

}

