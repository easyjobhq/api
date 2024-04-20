import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm";
import { IsString } from "class-validator";
import { Department } from "../entities/department.entity";


export class CreateCityDto {
    @IsString()
    readonly city_name: string;

    @IsString()
    readonly departmentId: string; // This will be the ID of the department
}
