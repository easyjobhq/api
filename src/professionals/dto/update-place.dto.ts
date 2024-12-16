import { IsOptional, IsString } from "class-validator";
import { CreatePlaceDTO } from "./create-place.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePlace extends PartialType(CreatePlaceDTO) {
    
    @IsString()
    @IsOptional()
    readonly id?: string;
}
