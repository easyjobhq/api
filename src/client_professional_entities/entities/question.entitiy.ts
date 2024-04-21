import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, ManyToMany } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
@Entity()
export class Question {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'float'})
    score: number;

    @Column({
        type:'text',
        nullable:true,
        width:500
    })
    comment: string;

    @ManyToOne(()=>Client, (client)=>client.questions)
    client: Client

    @ManyToMany(()=>Professional, (professional) => professional.questions,{
        cascade: true
    })
    professionals:Professional[]

}

