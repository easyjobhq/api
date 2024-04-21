import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    question_description: string;

    @ManyToOne(()=>Client, (client)=>client.reviews)
    client: Client

    @ManyToOne(()=>Professional, (professional)=> professional.reviews)
    professional: Professional


}

