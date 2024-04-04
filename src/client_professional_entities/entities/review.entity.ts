import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "src/professionals/entities/professional.entity";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    question_description: string;

    @ManyToOne(()=>Client, (client)=>client.reviews)
    client: Client

    @ManyToOne(()=>Professional, (professional)=> professional.reviews)
    professionals: Professional[]

}

