import { Professional } from "../../professionals/entities/professional.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity()
export class Language {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    language_name: string;

    @ManyToMany(()=>Professional, (professional)=>professional.languages)
    professionals: Professional[]

}
