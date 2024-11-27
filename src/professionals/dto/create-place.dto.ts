import { IsString } from "class-validator";

export class CreatePlaceDTO {
    @IsString()
    name: string;

    @IsString()
    longitude: number;

    @IsString()
    latitude: number;
}