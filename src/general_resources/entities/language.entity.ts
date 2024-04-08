import { Professional } from "../../professionals/entities/professional.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity()
export class Language {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    language_name: string;

    @ManyToMany(()=>Professional, (professional)=>professional.languages, {
        cascade: true
    })
    professionals: Professional[]

}
