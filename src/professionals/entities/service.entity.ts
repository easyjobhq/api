import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToMany } from "typeorm";
import { Professional } from "./professional.entity";

@Entity()
export class Service {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'text',
        nullable:false
    })
    title: string;

    @Column({
        type:'text',
        nullable:true
    })
    description: string;

    @Column({type: 'float'})
    price: number;

    @ManyToMany(()=>Professional, (professional)=>professional.services)
    professionals: Professional[]

}

