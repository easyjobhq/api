import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'float'})
    score: number;

    @Column()
    comment: string;

    @ManyToOne(()=>Client, (client)=>client.questions)
    client: Client

    @ManyToOne(()=>Professional, (professional) => professional.questions)
    professional:Professional

}

