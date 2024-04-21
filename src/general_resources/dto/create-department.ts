import { IsString } from "class-validator";

export class Department {

    @IsString()
    department_name: string;

}

