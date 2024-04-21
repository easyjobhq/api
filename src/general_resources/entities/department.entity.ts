import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class Department {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    department_name: string;

    @OneToMany(()=>City, (city)=>city.department)
    cities: City[]

}

