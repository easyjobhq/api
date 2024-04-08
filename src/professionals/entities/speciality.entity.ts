import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Professional } from "./professional.entity";

@Entity()
export class Speciality {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    speciality_name: string;

    @ManyToMany(()=>Professional, (professional)=>professional.specialities)
    professionals: Professional[]
}

