import { Type } from "class-transformer";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { Payment_method } from "src/general_resources/entities/payment_method.entity";

export class CreateQuestionDto {

    @IsString()
    title: string;

    @IsString()
    question_description: string;

    @ValidateNested()
    @Type(() => Client)
    client: Client

    @ValidateNested()
    @Type(() => Professional)
    professional: Professional

}

