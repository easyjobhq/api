import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToMany } from "typeorm";
import { Professional } from "./professional.entity";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: 'float'})
    price: number;

    @ManyToMany(()=>Professional, (professional)=>professional.services)
    professionals: Professional[]

}

