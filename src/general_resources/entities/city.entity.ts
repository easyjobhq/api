import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm";
import { Department } from "./department.entity";
import { Professional } from "../../professionals/entities/professional.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    city_name: string;

    @ManyToOne(()=>Department, (deparment)=>deparment.cities)
    department: Department

    @ManyToMany(()=>Professional, (professional)=>professional.cities,{
        cascade:true
    })
    professionals: Professional[]

}

