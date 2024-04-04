import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, ManyToMany } from "typeorm";
import { Client } from "src/clients/entities/client.entity";
import { Professional } from "src/professionals/entities/professional.entity";
@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'float'})
    score: number;

    @Column()
    comment: string;

    @ManyToOne(()=>Client, (client)=>client.questions)
    client: Client

    @ManyToMany(()=>Professional, (professional) => professional.questions,{
        cascade: true
    })
    professionals:Professional[]

}

