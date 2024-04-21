import { IsString } from "class-validator";

export class createSpecialityDto {

    @IsString()
    speciality_name: string;

}

