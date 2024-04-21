import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Professional } from "./professional.entity";

@Entity()
export class Speciality {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'text',
        nullable:false
    })
    speciality_name: string;

    @ManyToMany(()=>Professional, (professional)=>professional.specialities)
    professionals: Professional[]
}

